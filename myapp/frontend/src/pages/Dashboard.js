import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../redux/action/index";
function Dashboard() {
  const counter = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="dash">
        <h1>Counter</h1>
        <h1> {counter}</h1>
      </div>

      <div className="bttt">
        <button onClick={() => dispatch(increment())} className="btnInc">
          INCREMENT
        </button>
        <button onClick={() => dispatch(decrement())} className="btnDec">
          DECREMENT
        </button>
        <br />
        <button onClick={() => dispatch(reset())} className="btnRes">
          Reset
        </button>
      </div>
    </div>
  );
}
export default Dashboard;
