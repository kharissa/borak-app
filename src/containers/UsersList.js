import React from 'react'

export default class UsersList extends React.Component {
    render() {
       const users = this.props.users;
        return (
            <div>
                <div className="my-2 text-center">
                    <span className="brand-name">Borak</span>
                    <p className="brand-tagline">Real-Time Group Chat</p>
                    <hr />
                </div>
                <div>
                    <p><strong>Online Users</strong></p>
                    <ul>
                        {
                            users.length > 0 ? 
                            users.map((user, index) => 
                                <li key={index}>
                                    {user}
                                </li>
                            )
                            :
                            <p>No users online.</p>
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
