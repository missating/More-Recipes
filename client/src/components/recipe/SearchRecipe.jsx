import React from 'react';
import { connect } from 'react-redux';
import searchRecipes from '../../actions/searchRecipe';
/**
 *
 *
 * @export
 * @class SearchRecipe
 * @extends {React.Component}
 */
export class SearchRecipe extends React.Component {
  /**
   * Creates an instance of SearchRecipe.
   * @param {any} props
   * @memberof SearchRecipe
   */
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  /**
   *
   *
   * @param {any} event
   * @memberof SearchRecipe
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.props.searchRecipes(event.target.value, this.props.pagination.currentPage);
  }


  /**
   *
   *
   * @returns
   * @memberof SearchRecipe
   */
  render() {
    return (
      <div>
        <div className="col-lg-12">
          <form>
            <div className="input-group">
              <input
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

const mapDispatchToProps = dispatch => ({
  searchRecipes: searchQuery => (dispatch(searchRecipes(searchQuery)))
});

const mapStateToProps = state => ({
  pagination: state.pagination
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchRecipe);
