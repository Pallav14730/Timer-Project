import { forwardRef, useImperativeHandle, useRef } from "react"

const ResultModal = forwardRef (function ResultModal({ targetTime, remainingTime, onReset}, ref){
    const dialog = useRef();
    const userLost = remainingTime <=0;
    const formattedReamingTime = (remainingTime / 1000).toFixed(2);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })
    
    return (
        <dialog ref={dialog} className="result-modal">
            {userLost && <h2>You Lost</h2>}
            <p>The Target time was <strong>{targetTime} seconds.</strong> </p>
            <p>You stopped the timer with <strong> {formattedReamingTime} left. </strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>close</button>
            </form>
        </dialog>
    )

})
export default ResultModal;