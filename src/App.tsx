import { useReducer } from 'react'
import './App.css'

const reduce = (state: any, action: any) => {
  switch (action.type) {
    case "Tang":
      return {
        ...state,
        giatri: state.giatri + action.giatri
      }
    case "Giam":
      return {
        ...state,
        giatri: state.giatri - action.giatri
      }
    case "Reset":
      return {
        ...state,
        giatri: 0
      }
    default:
      return {
        ...state,
        giatri: 0
      }
  }
}

const reduceData = (state: any, action: any) => {
  switch (action.type) {
    case "GET_USER_SUCESSING":
      return {
        ...state,
        isLoading: action.isLoading
      }
    case "GET_USER_SUCESS":
      return {
        ...state,
        isLoading: action.isLoading,
        data: action.data
      }
  }
}

function App() {
  const [count, setCount] = useReducer(reduce, { type: "Tang", giatri: 0 });

  const [data, SetLoadData] = useReducer(reduceData, {
    type: "GET_USER_SUCESSING",
    data: [],
    isLoading: false
  });

  const FetchData = () => {
    SetLoadData({
      type: "GET_USER_SUCESSING",
      isLoading: true
    });

    setTimeout(() => {
      fetch('https://reqres.in/api/users')
        .then(res => res.json())
        .then(res => {
          SetLoadData({
            data: res,
            type: "GET_USER_SUCESS",
            isLoading: false
          });
        })
        .catch(err => {
          console.log("Error!", err);
        });
    }, 2000);
  }

  return (
    <>
      <div>{count.giatri}</div>
      <button style={{ marginTop: "10px", marginLeft: "10px", backgroundColor: "#938299" }} onClick={() => setCount({
        type: "Tang",
        giatri: 10
      })}>Cộng</button>
      <button style={{ marginTop: "10px", marginLeft: "10px", backgroundColor: "#938299" }} onClick={() => setCount({
        type: "Giam",
        giatri: 1
      })}>Trừ</button>
      <button style={{ marginTop: "10px", marginLeft: "10px", backgroundColor: "#938299" }} onClick={() => setCount({
        type: "Reset",
        giatri: 0
      })}>Reset</button>
      <div style={{ marginTop: "100px" }}></div>
      {data.isLoading ? <div>Loading...</div> : <div>{JSON.stringify(data.data)}</div>}
      <button onClick={FetchData}>Get USER</button>
    </>
  )
}

export default App
