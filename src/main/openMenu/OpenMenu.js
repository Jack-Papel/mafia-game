import { LineTextInput, TextInput } from "../TextInput";
import Button  from "../Button";
import React from "react";
import GameManager from "../../game/GameManager.";
import Main from "../Main";

export class OpenMenu extends React.Component
{
    constructor(props){
        super(props);
        
        this.state = {
            enteredName : ""
        };
    }
    render()
    {
        return(
            <div className = "Main">
                <div className = "Main-header">
                    <br/>
                    Mafia
                </div>
                <div className="Main-body">
                    Name: {this.state.enteredName}
                    <br/>
                    <LineTextInput onChange={(e)=>{
                        this.setState({enteredName : e});
                    }} />
                    <br/>
                    <br/>
                    <Button text="Host New Game" onClick={() => {
                        GameManager.instance.name = this.state.enteredName;
                        Main.instance.setState({currentMenu: <HostMenu/>})
                        GameManager.instance.startHost();
                    }}/>
                    
                    <br/><br/>
                    <Button text="Join Game" onClick={() => {
                        GameManager.instance.name = this.state.enteredName;
                        Main.instance.setState({currentMenu: <JoinMenu/>})
                    }}/>
                </div>
            </div>
        );
    }
}
export function JoinMenu(props){
    return(
        <div className = "Main">
            <div className = "Main-header">
                <br/>
                {GameManager.instance.name}
            </div>
            <div className = "Main-body">
                <br/>
                Room Code
                <br/>
                <LineTextInput onChange={(e)=>GameManager.instance.roomCode = e}/>
                <br/><br/>
                <Button text="Join Game" onClick={
                    () => {GameManager.instance.joinGame()}
                }/>
            </div>
        </div>
    );
}
export function HostMenu(props){
    return(
        <div className = "Main">
            <div className = "Main-header">
                <br/>
                {GameManager.instance.name}
            </div>
            <div className = "Main-body">
                <br/>
                Room Code
                <br/>
                <div style={
                    {
                        color: "white",
                        fontWeight: 1000,
                        WebkitTextStroke: "2px rgb(0, 0, 0)"
                    }
                }>
                    {GameManager.instance.roomCode}
                </div>
                <br/>
                <Button text="Start Game" onClick={
                    () => {}
                }/>
            </div>
        </div>
    );
}
export class WaitGameStartMenu extends React.Component{
    constructor(props){
        super(props);
    }
    renderPlayer(player){return(
        <div className = "Main-header">
            {player.name}
        </div>
    );}
    render(){return(
        <div className = "Main">
            <div className = "Main-header">
                <br/>
                Mafia
            </div>
            <div className="Main-body">
                Name: {GameManager.instance.name}
                <br/>
                Room Code : {GameManager.instance.roomCode}
                <br/>
                <br/>
                Players
                <br/>
                <br/>
                {GameManager.instance.gameState.players.map((p)=>{
                    renderPlayer(p)
                })}
            </div>
        </div>
    );}
}