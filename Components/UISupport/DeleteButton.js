import React from "react"
import { TouchableOpacity } from "react-native"
import Colors from "../../Constants/Colors"

import MaIcon from "../Icon/MaIcon"
const DeleteButton = props => {
    return (
        <TouchableOpacity onPress={props.onDelete} style={{ height: 25, width: 25, backgroundColor: "red", borderRadius: 15, justifyContent: "center", alignItems: "center" }}>
            <MaIcon
                name="delete"
                color={Colors.white}
                size={15}

            />
        </TouchableOpacity>
    )
}
export default DeleteButton