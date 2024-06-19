import { HTTP_WITH_COOKIE } from "../../share/Http";

const Login = () => {
  return (
    <>
      <button onClick={async () => {
        try {
          const res = HTTP_WITH_COOKIE.post('/api/v1/auth/login', {
            name: 'anupam',
            email: 'anupam@gmail.com',
            password: 'admin1234',
            provider: 'EMAIL',
          });
          console.log(res);
        } catch (e) {
          console.log(e);
        }
      }}>
        login
      </button>
    </>
  )
}

export default Login;
