function NameInput( {name}: {name: string} ) {
    return (
        <input className="TextInput" type="text" placeholder={"Name for column " + name} defaultValue=""/>
    )
}

export default NameInput;