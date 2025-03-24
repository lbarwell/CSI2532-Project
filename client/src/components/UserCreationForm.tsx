const UserCreationForm = () => {
  return (
    <div style={{ marginTop: "1em", padding: "1em" }}>
      <h2>Book your stay</h2>
      <form className="row g-3 needs-validation" noValidate>
        <div className="col-md-6">
          <label htmlFor="validationCustom01" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="validationCustom02" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom02"
            required
          />
        </div>

        <div className="col-md-8">
          <label htmlFor="validationCustomUsername" className="form-label">
            Email
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">
              @
            </span>
            <input
              type="text"
              className="form-control"
              id="validationCustomUsername"
              required
            />
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">
            Phone number
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom02"
            required
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="validationCustom03" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom03"
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="validationCustom04" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom03"
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="validationCustom05" className="form-label">
            State/Province
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom05"
            required
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="validationCustom04" className="form-label">
            Zip code
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom03"
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="validationCustom04" className="form-label">
            Social insurance number
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom03"
            required
          />
        </div>

        <div className="col-9" />
        <div className="col-3">
          <button
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "2em" }}
            type="submit"
          >
            Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserCreationForm;
