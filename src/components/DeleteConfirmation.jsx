export default function DeleteConfirmation({ onConfirm, onCancel }) {

    // Auto Confirm Delete if 3 seconds passed,
    // but you have a problem
    // this component is always a part of the dom  from the first application loading
    // but it's hidden as the modal is hidden but it exists in the dom
    // so that it will automatically be executed after the app component loads
    console.log('Timer SET')
    setTimeout(() => {
        onConfirm();
    }, 3000);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}
