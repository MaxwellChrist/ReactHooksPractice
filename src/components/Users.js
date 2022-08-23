import React from "react";

const Users = ({data}) => {
    if (data) {
        return (
            <ul>
                {data.map((item) => (
                    <li style={{listStyleType: 'none'}} key={item.id}>{item.login}</li>
                ))}
            </ul>
        )
    } else {
        <p>No Users</p>
    }
}

export default Users