import {useEffect} from "react";

export default function DeleteConfirmation({ onConfirm, onCancel }) {

    // Auto Confirm Delete if 3 seconds passed,
    // but you have a problem
    // this component is always a part of the dom  from the first application loading
    // but it's hidden as the modal is hidden but it exists in the dom
    // so that it will automatically be executed after the app component loads

    // Effect Cleanup function => will be executed right before the effect function runs again
    // You define a cleanup function by returning it from inside the effect function

    // ==> this cleanup function will be executed before this component is removed from the DOM

    useEffect(() => {
        console.log('Timer SET')
        const timer = setTimeout(() => {
            onConfirm();
        }, 3000);

        return () => {
            console.log("Cleaning Up Timer")
            clearTimeout(timer);
        };

    }, [onConfirm]) // i have no dependencies => the effect function will never run again
    // If you use a prop inside an effect , you need to include it in dependencies
    // ESLint: React Hook useEffect has a missing dependency:
    // 'onConfirm'. Either include it or remove the dependency array.
    // If 'onConfirm' changes too often,
    // find the parent component that defines it and wrap that definition in useCallback.
    // (react-hooks/exhaustive-deps)

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
