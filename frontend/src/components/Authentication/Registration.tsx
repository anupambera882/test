const Registration = () => {
  return (
    <div className="container d-flex vh-100">
      <div className="row justify-content-center align-self-center w-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Registration</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control mb-3" placeholder="Enter your name" required />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control mb-3" placeholder="Enter your email" required />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control mb-3" placeholder="Enter a username" />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control mb-3" id="password" placeholder="Enter your password" required />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;