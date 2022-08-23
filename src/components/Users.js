import React from "react";

const Users = ({data, setData}) => {
    if (data) {
        return (
            <div>
                <ul>
                    {data.map((item) => (
                        <li style={{listStyleType: 'none'}} key={item.id}>{item.login}</li>
                    ))}
                </ul>
                <button onClick={() => setData([])}>Clear List</button>
            </div>
        )
    } else {
        <p>No Users</p>
    }
}

export default Users