const express = require('express');
const db = require('./database/database'); // database.js 파일 불러오기
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// 게시글 생성
app.post('/posts', async (req, res) => {
  const { title, content, author } = req.body;
  const query = `
    INSERT INTO notice_board (title, content, author, createdAt, updatedAt)
    VALUES ($1, $2, $3, NOW(), NOW())
    RETURNING *;
  `;
  const values = [title, content, author];

  try {
    const result = await db.query(query, values);
    res.status(201).json(result.rows[0]); // 새로 추가된 게시글 반환
  } catch (err) {
    console.error('게시글 생성 오류:', err);
    res.status(500).json({ error: '게시글 생성 실패' });
  }
});

// 모든 게시글 조회
app.get('/posts', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM notice_board');
    res.json(result.rows);
  } catch (err) {
    console.error('게시글 조회 오류:', err);
    res.status(500).json({ error: '게시글 조회 실패' });
  }
});

// 특정 게시글 조회 (조회수 증가 없음)
app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT * FROM notice_board
    WHERE id = $1
  `;

  try {
    const result = await db.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('게시글을 찾을 수 없습니다.');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('특정 게시글 조회 오류:', err);
    res.status(500).json({ error: '게시글 조회 실패' });
  }
});

// 조회수 증가 엔드포인트
app.post('/posts/:id/view', async (req, res) => {
  const { id } = req.params;
  const query = `
    UPDATE notice_board
    SET views = views + 1
    WHERE id = $1
    RETURNING views;
  `;

  try {
    const result = await db.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('게시글을 찾을 수 없습니다.');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('조회수 증가 오류:', err);
    res.status(500).json({ error: '조회수 증가 실패' });
  }
});

// 특정 게시글 수정
app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  const query = `
    UPDATE notice_board
    SET title = $1, content = $2, author = $3, updatedAt = NOW()
    WHERE id = $4
    RETURNING *;
  `;
  const values = [title, content, author, id];

  try {
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).send('게시글을 찾을 수 없습니다.');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('게시글 수정 오류:', err);
    res.status(500).json({ error: '게시글 수정 실패' });
  }
});

// 특정 게시글 삭제
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM notice_board WHERE id = $1 RETURNING *';

  try {
    const result = await db.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('게시글을 찾을 수 없습니다.');
    }
    res.status(204).send();
  } catch (err) {
    console.error('게시글 삭제 오류:', err);
    res.status(500).json({ error: '게시글 삭제 실패' });
  }
});

// 서버 실행
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
