import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import Checkbox from "../Checkbox/Checkbox";
import { fonts, colors } from "../../Styles";

/**
 * Table component for displaying the tasks to be completed in the onboarding tasks page.
 * 
 * Props:
 * - tasks<Array<Object>>: List of tasks represented by objects containing the task name, status and index.
 *      Syntax of task: {
 *          name: <String>,
 *          done: <Boolean>,
 *          index: <Integer>
 *      }
 * 
 * - setTasks<Function>: Function provided by the parent component to modify the status of each task.
 *      Syntax: setTasks(<Object>)
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function ToDoTable({tasks, setTasks, style}) {
    //Custom style elements
    const TableHeaderCell = styled(TableCell)({
        color: colors.darkGrey,
        paddingTop: "10px",
        paddingBottom: "10px"
    });

    //Function to handle changes made to the to-do list
    function handleChange(e, index) {
        //console.log(tasks);
        //console.log(index);
        const newTasks = tasks.filter((task) => task.index !== index);
        //console.log(newTasks);
        const updatedTask = tasks.filter((task) => task.index === index)[0];
        //console.log(updatedTask);
        updatedTask.done = !updatedTask.done;
        newTasks.push(updatedTask);
        setTasks(newTasks);
    }

    return (
        <TableContainer sx={{...{
            minWidth: "812px",
            fontFamily: fonts.fontFamily
        }, ...style}}>
            <Table>
                {/*Header*/}
                <TableHead>
                    <TableRow sx={{backgroundColor: "#F9FAFB"}}>
                        <TableHeaderCell>
                            <b style={{color: colors.grey}}>To-Do</b>
                        </TableHeaderCell>
                        <TableHeaderCell align="right">
                            <b style={{color: colors.grey}}>Done</b>
                        </TableHeaderCell>
                    </TableRow>
                </TableHead>
                {/*Tasks*/}
                <TableBody>
                    {tasks.sort((task1, task2) => task1.index - task2.index).map((task, index) => (
                        <TableRow>
                            <TableCell>
                                {task.name}
                                <span style={{color: "red"}}>*</span>
                            </TableCell>
                            <TableCell align="right">
                                <Checkbox
                                    type="checkbox"
                                    id={`${task.name}-done`}
                                    name={`${task.name}-done`}
                                    value={`${task.name}-done`}
                                    size="large"
                                    checked={task.done}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

//Control panel settings for storybook
ToDoTable.propTypes = {
    //List of tasks
    tasks: PropTypes.arrayOf(PropTypes.object),

    //Function for setting the status of tasks
    setTasks: PropTypes.func
};

//Default values for this component
ToDoTable.defaultProps = {
    style: {}
}