const http = require('http');

const data = JSON.stringify({
  enrollmentId: "dummy123",
  name: "test",
  email: "test@test.com",
  mobile: "123",
  course: "frontend"
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/create-payment-order',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', d => {
    body += d;
  });
  res.on('end', () => {
    console.log(res.statusCode);
    console.log(body);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
