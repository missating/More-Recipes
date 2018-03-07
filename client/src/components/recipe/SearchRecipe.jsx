import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import searchRecipes from '../../actions/searchRecipe';


/**
 * @description Creates SearchRecipe component
 *
 * @class SearchRecipe
 *
 * @extends {React.Component}
 */
export class SearchRecipe extends React.Component {
  /**
  * @description Creates an instance of SearchRecipe.
  *
  * @constructor
  *
  * @param {object} props
  *
  * @memberof SearchRecipe
  *
  * @returns {void}
  */
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  /**
  * @description Bind the value of the inputs to state
  *
  * @method onChange
  *
  * @param {object} event
  *
  * @memberof SearchRecipe
  *
  * @returns {void}
  */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.props.searchRecipes(
      event.target.value,
      this.props.pagination.currentPage
    );
  }

  /**
    * @description Renders react component
    *
    * @method render
    *
    * @memberof SearchRecipe
    *
    * @returns {void}
    *
    */
  render() {
    return (
      <div>
        <div className="col-lg-12">
          <form>
            <div className="input-group">
              <input
                id="search"
                type="text"
                name="searchQuery"
                className="form-control"
                value={this.state.searchQuery}
                onChange={this.onChange}
                placeholder="Search for..."
              />
            </div>
          </form>
        </div >
        <hr />
      </div >

    );
  }
}

SearchRecipe.propTypes = {
  searchRecipes: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    currentPage: PropTypes.number
  })
};

SearchRecipe.defaultProps = {
  pagination: {
    currentPage: 1
  }
};

const mapDispatchToProps = dispatch => ({
  searchRecipes: searchQuery => (dispatch(searchRecipes(searchQuery)))
});

const mapStateToProps = state => ({
  pagination: state.pagination,
});


const ConnectedComponent =
  connect(mapStateToProps, mapDispatchToProps)(SearchRecipe);
export { ConnectedComponent as ConnectedSearchRecipe };
