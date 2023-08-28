import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cookieParser());

// 'req.cookies'를 이용하여 클라이언트의 모든 쿠키를 조회하는 API
app.get('/get-cookie', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  return res.status(200).json({ cookie: cookies });
});

let session = {};
app.get('/set-session', function (req, res, next) {
  // 현재는 sparta라는 이름으로 저장하지만, 나중에는 복잡한 사용자의 정보로 변경될 수 있습니다.
  const name = 'sparta';
  const uniqueInt = Date.now();
  // 세션에 사용자의 시간 정보 저장
  session[uniqueInt] = { name };

  res.cookie('sessionKey', uniqueInt);
  return res.status(200).end();
});

app.get('/get-session', function (req, res, next) {
  const { sessionKey } = req.cookies;
  // 클라이언트의 쿠키에 저장된 세션키로 서버의 세션 정보를 조회합니다.
  const name = session[sessionKey];
  return res.status(200).json({ name });
});

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});