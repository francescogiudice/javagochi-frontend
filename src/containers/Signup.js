import React from 'react';
import { Form, Input, Button, Icon, Spin } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

class RegistrationForm extends React.Component {

  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
          this.props.onAuth(
            values.userName,
            values.email,
            values.password,
            values.confirm
        );
        this.props.history.push('/myprofile');
      }
    });
  }

  // handleConfirmBlur = (e) => {
  //   const value = e.target.value;
  //   this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  // }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you entered are inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;

    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if (value && value.match(lowerCaseLetters) && value.match(upperCaseLetters) && value.match(numbers) && value.length >= 8) {
      // if (this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
        callback();
      // } else {
      //   callback('Two passwords that you entered are inconsistent!');
      // }
    } else {
      callback('Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
    }
  }

  render() {

    let errorMessage = null;
    if(this.props.error) {
        errorMessage = (
            <p>{this.props.error.message}</p>
        );
    }
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
      {errorMessage}
      {
        this.props.loading
        ?
        <Spin />
        :
        <Form onSubmit={this.handleSubmit}>

        <Form.Item>
        {getFieldDecorator('userName', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
        )}
        </Form.Item>

        <Form.Item>
        {getFieldDecorator('email', {
          rules: [{
            type: 'email', message: 'The input is not valid E-mail!',
          }, {
            required: true, message: 'Please input your E-mail!',
          }],
        })(
          <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-mail" />
        )}
        </Form.Item>

        <Form.Item label="Password (Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters)">
        {getFieldDecorator('password', {
          rules: [{
            required: true, message: 'Please input your password!',
          }, {
            validator: this.validateToNextPassword,
          }],
        })(
          <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />
        )}
        </Form.Item>

        <Form.Item label="Confirm Password">
        {getFieldDecorator('confirm', {
          rules: [{
            required: true, message: 'Please confirm your password!',
          }, {
            validator: this.compareToFirstPassword,
          }],
        })(
          <Input type="password" onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Repeat password"/>
        )}
        </Form.Item>

        <Form.Item>
        <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>Signup</Button>
        or
        <NavLink style={{marginRight: '10px'}} to="/login/"> login</NavLink>
        </Form.Item>
        </Form>
      }
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);
