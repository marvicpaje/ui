import React from 'react';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            selectedMenu: null
            
        }
    }

    componentDidMount() {
        console.log("Calling Menu Service through proxy");
        fetch('/menu/menus').then(res => res.json())
        .then(menuItems => {
            this.setState({menus: menuItems});
        })
        .catch((error) => {
            alert("Unable to get menus from the Menu Service " + error)
        });
    }

    updateSelectedMenu(menu) {
        this.setState({ selectedMenu: menu})
    }

    render() {
        return(
            <div>
                <h1>{this.props.title}</h1>
                <hr/>

                <div className="menuList">
                    <b>Menu List</b>
                    <ol className="menuItem">
                        {this.state.menus.map((value, index) => {
                            return (
                                <li onClick={() => { this.updateSelectedMenu(value)}}>
                                    {value.menuItemNumber} - {value.name}
                                </li>
                            )
                        }
                        )}
                    </ol>
                </div>

                <div>
                    <b>Selected Menu Details</b>
                     {
                        (this.state.selectedMenu) ? (
                            <div>
                                <label>Menu Item Number</label>: {this.state.selectedMenu.menuItemNumber}<br />
                                <label>Category</label>: {this.state.selectedMenu.category}<br />
                                <label>Name</label>: {this.state.selectedMenu.name}<br />
                                <label>Description</label>: {this.state.selectedMenu.description}<br />
                                <label>Num Available</label>: {this.state.selectedMenu.numAvailable}<br />
                                <label>Price</label>: {this.state.selectedMenu.price}
                            </div>
                        ) : (
                            <div>No Menu Selected</div>
                        )
                      }
                </div>
            </div>
        )

    }   

}

export default Menu;