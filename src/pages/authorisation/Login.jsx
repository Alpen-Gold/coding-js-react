const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");



    return (
        <div>
 <input type="text" className="user" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
 <input type="password" className="password" value={password} onChange={(e) => {setPassword(e.target.value)} }/>
 <input type="password" className="password" value={passwordConfirm} onChange={(e) => {setPasswordConfirm(e.target.value)} }/>


    <button onClick={ async () => {
        try {
            const res = await fetch("https://5d20df6821c8800e.mokky.dev/register", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: username,
    password: password
  })
});
        } catch (error) {
            alert(error)
        }
    }}>

    </button>

        </div>
    )
}