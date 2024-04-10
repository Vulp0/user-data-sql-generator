function NameInput( {name}: {name: string} ) {
    return (
        <input className="TextInput" type="text" placeholder={"Enter name for column " + name} defaultValue=""/>
    )
}

export default NameInput;