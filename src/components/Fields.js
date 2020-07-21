import {bindActionCreators} from "redux";
import {closeSnackbar, enqueueSnackbar, upd_app} from "../actions/actionCreator";
import {connect} from "react-redux";
import React, {Component, Fragment} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";


const mapDispatchToProps = dispatch => bindActionCreators({
    enqueueSnackbar,
    closeSnackbar,
    upd_app
}, dispatch);

export default connect(state => (state), mapDispatchToProps)(class extends Component {

    state = {
        index: 'customer',
        systemFieldsHandle: 0,
        customerFieldsCounter: 0
    }

    // componentWillUpdate(p, nextState) {
    //
    //     console.log(this.props.app.fields.allElements
    //         .filter(field => field.index === this.state.index))
    //     console.log(nextState)
    //
    // }

    componentDidMount() {

        let fields = []
        this.props.app.fields.allElements && this.props.app.fields.allElements.map(v => {
            if (v.index === this.state.index) fields.push(v);
            if (v.name === 'prepaid') {
                console.log(v.is_valid)
            }
        })

        this.setState({
            fields,
            systemFieldsHandle: 0,
            customerFieldsCounter: 0
        })

    }

    reset() {

        let fields = []
        this.props.app.fields.allElements
            .filter(field => field.index === this.state.index)
            .map(v => fields.push(v))

        this.setState({
            fields,
            systemFieldsHandle: 0,
            customerFieldsCounter: 0
        })

    }

    indexHandle(index) {
        this.setState({
            index,
            fields: this.props.app.fields.allElements
                .filter(field => field.index === index)
        })
    }

    systemFieldsHandle(systemFieldsHandle) {
        this.setState({systemFieldsHandle})
    }

    addField() {

        let fields = this.state.fields
        if (this.state.systemFieldsHandle === 0) {

            let cf = ++this.state.customerFieldsCounter;
            fields.splice(0, 0, {
                index: this.state.index,
                name: 'cf' + cf,
                value: '',
                is_system: false,
                is_valid: true,
            })
            this.setState({
                fields,
                customerFieldsCounter: cf
            })

        } else {

            let fields = this.state.fields.map(f => {
                if (f.name === this.state.systemFieldsHandle) f.is_valid = true;
                return f;
            })
            this.setState({
                fields,
                systemFieldsHandle: 0
            })

        }
    }

    fieldHandle(name, value) {

        let fields = this.state.fields
        fields.find(field => field.name === name).value = value
        this.setState({fields})

    }

    moveField(name, direction) {

        let field = this.state.fields.filter(f => f.name === name)[0]
        let i = this.state.fields.indexOf(field)
        let fields = this.state.fields.filter(f => f.name !== name)

        if (direction === 'up') i--
        if (direction === 'down') i++
        if (i === -1) i = 0

        fields.splice(i, 0, field)

        this.setState({fields})

    }

    deleteField(field) {

        let fields = [];
        if (field.is_system) {

            this.state.fields.map(f => {
                if (f.name === field.name) {
                    f.is_valid = false;
                }
                fields.push(f)
            })

        } else {

            fields = this.state.fields.filter(f => f.name !== field.name);

        }
        // console.log(this.state.fields.find(f => f.name === field.name).is_valid)

        this.setState({fields})

    }

    render() {

        if (typeof this.state.fields === "object") {

            let index = this.state.index;

            return <Paper style={{padding: '1rem'}}>
                <Grid container direction="row" justify="space-evenly"
                      style={{marginBottom: '1rem'}}
                >

                    <Select
                        style={{width: '75%'}}
                        value={index}
                        onChange={e => this.indexHandle(e.target.value)}
                    >
                        {['order', 'customer'].map(i => <MenuItem value={i} key={"fieldindexmenuuywgvf" + i}>
                                <Typography variant="h5">
                                    {this.props.app.fields.alliases[i]}
                                </Typography>
                            </MenuItem>
                        )}
                    </Select>

                </Grid>

                <Grid container direction="row" justify="space-evenly"
                      style={{marginBottom: '1rem'}}
                >
                    <FormControl style={{width: '75%'}}>
                        <Select
                            variant="outlined"
                            value={this.state.systemFieldsHandle}
                            onChange={e => this.systemFieldsHandle(e.target.value)}
                        >
                            <MenuItem value="0" key={"addsysmfield"}>
                                Новое поле
                            </MenuItem>
                            {this.state.fields.map(v => v.is_system && !v.is_valid ?
                                <MenuItem value={v.name} key={"addsysmfield" + v.name}>
                                    {v.value}
                                </MenuItem> : ''
                            )}
                        </Select>
                    </FormControl>

                    <Tooltip title="Добавить">
                        <IconButton onClick={() => this.addField()}>
                            <AddCircleIcon/>
                        </IconButton>
                    </Tooltip>

                </Grid>

                {this.state.fields.map(field => field.is_valid ?
                    <FormControl key={"elem" + index + field.name}
                                 style={{
                                     width: '100%',
                                     padding: '1rem'
                                 }}>
                        <Input
                            value={field.value}
                            disabled={field.is_system}
                            onChange={e => this.fieldHandle(field.name, e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => this.moveField(field.name, 'down')}
                                    >
                                        {<ArrowDownwardIcon/>}
                                    </IconButton>
                                    <IconButton
                                        onClick={() => this.moveField(field.name, 'up')}
                                    >
                                        {< ArrowUpwardIcon/>}
                                    </IconButton>
                                    <IconButton
                                        onClick={() => this.deleteField(field)}
                                    >
                                        {<DeleteIcon/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl> :
                    ''
                )}

                <Grid container justify="flex-end">
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{margin: '1rem'}}
                        onClick={() => this.componentDidMount()}
                    >
                        Отмена
                    </Button>
                    <Button
                        disabled={JSON.stringify(this.state.fields) === JSON.stringify(this.props.app.fields.allElements
                            .filter(field => field.index === index))
                        }
                        variant="contained"
                        color="primary"
                        style={{margin: '1rem'}}
                        // onClick={}
                    >
                        Сохранить
                    </Button>
                </Grid>

            </Paper>

        } else return '';

    }

})