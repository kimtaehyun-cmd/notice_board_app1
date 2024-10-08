const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL 연결 설정
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// 연결 확인 함수
pool.connect((err, client, release) => {
  if (err) {
    console.error('데이터베이스 연결 오류:', err.stack);
  } else {
    console.log('데이터베이스 연결 성공!');
  }
  release();
});

// notice_board 테이블에 쿼리 실행 함수
const query = (text, params) => {
  return pool.query(text, params);
};

module.exports = {
  query,
};
