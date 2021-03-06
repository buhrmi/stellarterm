const React = window.React = require('react');

export default class BalancesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'ready', // Can be: ready, pending, or error
    };

    this.handleRemoveTrust = e => {
      e.preventDefault();
      this.props.d.handlers.removeTrust(this.props.balance.asset_code, this.props.balance.asset_issuer)
      .then(res => {
        console.log('Successfully removed trust', res);
      })
      .catch(err => {
        console.log('Errored when removing trust', err);
        this.setState({
          status: 'error',
        })
      })
      this.setState({
        status: 'pending',
      })
    }
  }
  render() {
    let balance = this.props.balance;
    if (balance.balance === '0.0000000') {
      if (this.state.status === 'ready') {
        return <a className="BalancesTable__row__removeLink" onClick={this.handleRemoveTrust}>Remove trust</a>
      } else if (this.state.status === 'pending') {
        return <span className="BalancesTable__row__removeLink">Removing trust ...</span>
      } else {
        return <a className="BalancesTable__row__removeLink" onClick={this.handleRemoveTrust}>Errored when removing trust</a>
      }
    } else {
      return <span className="BalancesTable__row__removeLink">Trust is removable when balance is 0</span>
    }
  }
}
