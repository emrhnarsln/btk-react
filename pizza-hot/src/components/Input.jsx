export default function Input({ labelText, id, err, ...props }) {
  return (
    <>
      <div className="mb-3">
        <label htmlFor={id} className="form-label">
          {labelText}
        </label>
        {id === "address" ? (
          <textarea className="form-control" id={id} {...props}></textarea>
        ) : (
          <input type="text" id={id} {...props} className="form-control" />
        )}

        {err && <div className="invalid-feedback d-block">{err}</div>}
      </div>
    </>
  );
}
