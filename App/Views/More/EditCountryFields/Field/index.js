import React from 'react'
import {Field} from 'simple-react-form'
import PropTypes from 'prop-types'
import TableTextInput from 'App/components/fields/TableTextInput'
import GraphQLSelect from 'App/components/fields/GraphQLSelect'

export default class CountryField extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    options: PropTypes.string
  }

  getType() {
    if (this.props.type === 'select') {
      return GraphQLSelect
    }
    if (this.props.type === 'rut') {
      return TableTextInput
    }

    return TableTextInput
  }

  getExtra() {
    if (this.props.type === 'select') {
      return {dataName: this.props.options}
    }

    return {}
  }

  render() {
    return (
      <Field
        fieldName={this.props.name}
        type={this.getType()}
        label={this.props.label}
        {...this.getExtra()}
      />
    )
  }
}
