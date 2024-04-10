function DataInput( {name}: {name: string}) {
    return (
        <select className="SelectInput">
            <option value="">Data for column {name}</option>
            <option value="firstName">firstName</option>
            <option value="lastName">lastName</option>
            <option value="streetNumber">streetNumber</option>
            <option value="streetName">streetName</option>
            <option value="city">city</option>
            <option value="state">state</option>
            <option value="country">country</option>
            <option value="postCode">postCode</option>
            <option value="timezoneOffset">timezoneOffset</option>
            <option value="email">email</option>
            <option value="username">username</option>
            <option value="password">password</option>
            <option value="birthDate">birthDate</option>
            <option value="age">age</option>
            <option value="phone">phone</option>
            <option value="cell">cell</option>
        </select>
    )
}

export default DataInput;