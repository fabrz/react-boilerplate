import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../redux/actions';
import Main from '../Main/Main';

function mapStateToProps({
  navigation,
}) {
  return {
    navigation,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
