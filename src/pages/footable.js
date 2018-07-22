import React, { Component } from 'react';
import withAuth from '../services/withAuth';
import {TextField, Select, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Card, Button, Icon, Table, TableHead,TableBody, TableCell, TableFooter, TablePagination, TableRow} from '@material-ui/core'
import CustomPaginationActionsTable from '../components/Table.js';
import TablePaginationActions from '../components/TablePaginationActions.js'
import { withStyles } from '@material-ui/core/styles';
import AlertDialog from '../components/dialog';
import jQuery from 'jquery';
import ReactDOM from 'react-dom';


//****************************************************************************************************************

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});
const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);
const BASE = 'http://localhost:3000';
const cart = localStorage.getItem( 'myorder' )


//****************************************************************************************************************

class myFootable extends Component {
    constructor(props){
    super(props)
    this.myTablePaginationActions = new TablePaginationActions()
      this.state={
        order: 'show',
        // orderpage:'',
        allvinyl: [],
        myorder: [],
        myorderpage: '',
        rowsPerPage: 5,
        page: 0,
        count: 1,
        open: [],
        totalprice: 0,
        pageSizeLength:10,
        search: '',
        StashedfilteredItems: [],
        filteredItemsOnReturn: [],
        searchparams: [],
        searchresultline: '',
        orderdisplay: '',
      }

  }

  componentWillMount(){
    //
    // console.log(this.myTablePaginationActions);
    // let userID = Auth.getUserId()
let myorder = []
// if (localStorage && localStorage.getItem('cart')) {
//      var cart = JSON.parse(localStorage.getItem('cart'));
    // localStorage.setItem('cart', JSON.stringify(cart))
    if (localStorage && localStorage.getItem('myorder')) {
      console.log("TEST");
    var cart = JSON.parse(localStorage.getItem('myorder'));
    // if(cart){
      myorder = cart
      console.log(myorder);
    }
    return fetch(BASE + '/exclusives')
      .then((resp) => {
        return resp.json()
      })
      .then(APIinfo => {
        if(APIinfo.length ==0 ){

          // this.props.history.push('/log', nodata.true)
        } else{
          console.log(myorder[0]);
        this.setState({
          allvinyl: APIinfo, myorder: myorder, filteredItemsOnReturn: APIinfo
        }
        , this.isThereAnOrder


      )
        }
})
}
//
// getInitialState() {
//     var myorder = localStorage.getItem( 'myorder' );
//     // console.log(myorder);
//     var orderdiplay = '';
//     if(myorder == 'undefined'){
//       myorder = [];
//       var orderdisplay = "none";
//     } else{
//       console.log('there');
//       var orderdisplay = "none";
//       }
//       console.log(orderdisplay);
//     this.setState( { myorder: myorder, orderdisplay: orderdisplay} );
// }

getTotalPrice(){
  let {myorder} = this.state
  let price = 0
  myorder.map((element)=>{
  price = parseFloat(element.price) + price
  }
)
// console.log("price:");
// console.log(price);
return (
price

  )
}

isThereAnOrder(){
  var display = ''
  console.log(this.state.myorder.length)
  if(this.state.myorder.length < 1){
    display = "none"
  }
  else {
    display = ""
  }
console.log(display)
  this.setState({orderdisplay: display})


}

setmyorder() {
    // localStorage.setItem( 'myorder',{price: '9.95', title: 'baby'});
    localStorage.setItem('myorder', JSON.stringify(this.state.myorder));
    var order = localStorage.getItem('myorder');
    console.log(order);
    this.getTotalPrice()

    // this.setState( { myorder: 'myorder'} );
}

clearcart(){
   localStorage.removeItem('myorder');
   this.setState({myorder: []}, this.isThereAnOrder)
}

handleChangePage = (event, page) => {
  this.setState({ page });
};

// toggleOrder(){
//   let myorderpage
//
//   if(this.state.myorderpage == 'flex'){
//     myorderpage = 'none'
//   } else {
//     myorderpage = 'flex'
//   }
//
//   this.setState({myorderpage: myorderpage})
// }


addToOrder(element){
  let {myorder} = this.state
  myorder.push(element)
  this.setState({myorder: myorder, orderdisplay: ''}, this.setmyorder)
}




handleChangeRowsPerPage = event => {
  this.setState({ rowsPerPage: event.target.value });
}

removeItem(element, index){
  let {myorder} = this.state
  myorder.splice(index, 1)
  this.setState({myorder: myorder}, this.setmyorder, this.isThereAnOrder, this.handleClose(element,index)
)
}

handleClickOpen = (element,index) => {
let {open} = this.state
open[index] = true
  this.setState({ open: open});
};

handleClose = (element,index) => {
  let {open} = this.state
  open[index] = false
  this.setState({ open: open });
};


// handleChangeRowsPerPage(event){
//   this.setState({ rowsPerPage: event.target.value })
// }
// addToOrder(element){
//   let {myorder} = this.state
//   // let {orderpage} = this.state
//   console.log('added to order' + element.id);
//   myorder.push(element.price)
//   // console.log(this.state.orderpage)
//     console.log(myorder)
//   orderpage =  <div className='inorder'>
//     My Order: {myorder.map((element,index)=>
//     element)}
//     </div>
// this.setState({myorder: myorder, orderpage: orderpage}, this.setmyorder)
// }

// componentDidUpdate(prevProps, prevState) {
//   // table initialization
//   jQuery(ReactDOM.findDOMNode(this.refs.productstable)).footable();
// }
//
//
// componentDidMount(){
//               $('#sampleTable').footable({
//                     "columns": ["Col 1", "Col 2"],
// 		                    "rows": ["Row 1", "Row 2"]
//             });
//           }
//
//
//     componentDidUpdate(prevState,prevProps){
//   if(prevState.pageSizeLength!=this.state.pageSizeLength)
//   FooTable.get('#sampleTable').pageSize(this.state.pageSizeLength);
//   }
SearchEvent(event){
  // console.log(event.target.value)
  // let {searchparams} = this.state
  // // let {StashedfilteredItems} = this.state
  // let StashedfilteredItems = this.state.allvinyl.filter((item)=>{
  //     return (item.artist.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || item.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || item.label.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
  //     })
  // console.log(event.target.value)

// console.log(event.key)
//   searchparams.push(event.target.value)
//   searchparams.join("")
//   console.log(searchparams)

  let searchword = event.target.value



  this.setState({search: event.target.value.substr(0,20), searchparams: searchword})
}

catchReturn(){

  let {searchparams, searchresultline} = this.state
  // console.log(searchparams);
  searchresultline = <div>Search Results for "{searchparams}"...  <a onClick ={this.undosearch.bind(this)}>undo</a></div>
  // let searchword =  searchparams
  // searchword.split('')
  let StashedfilteredItems = this.state.allvinyl.filter((item)=>{
   return (item.artist.toLowerCase().indexOf(searchparams.toLowerCase()) !== -1 || item.title.toLowerCase().indexOf(this.state.searchparams.toLowerCase()) !== -1 || item.label.toLowerCase().indexOf(this.state.searchparams.toLowerCase()) !== -1)
     })


  // console.log(StashedfilteredItems)


  this.setState({filteredItemsOnReturn: StashedfilteredItems, searchresultline: searchresultline})

}

undosearch(){
  this.setState({search: '', searchparams: '', searchresultline: '', filteredItemsOnReturn: this.state.allvinyl})
}


openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
    document.getElementById("hamburger").style.display = "none";
}

closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight= "0";
    document.getElementById("hamburger").style.display = "";
}

  render() {
    // let StashedfilteredItems = this.state.allvinyl.filter((item)=>{
    //   return (item.artist.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || item.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || item.label.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
    // }
    //
    //
    // )
  //
  // let StashedfilteredItems = this.state.allvinyl
  // console.log(StashedfilteredItems)
// console.log(TablePaginationActions);
let altdisplay = "none";

if(this.state.orderdisplay == "none"){
  altdisplay = ""
}

    return (
      <div>
        <div>


            <span id="hamburger" onClick={this.openNav.bind(this)}>&#9776;</span>


              <div id="main">
                <h2>Exclusives</h2>
                <div className = "banner">EXCLUSIVES
                </div>

        {/*
                      IF I WANT TO HAVE A TABLE AND REMOVE CERTAIN COLUMNS AT CERTAIN SIZE WINDOWS/MEDIA: */}
                               {/* <th data-breakpoints="xs">Description</th>
                               <th data-breakpoints="xs sm">Quantity</th> */}

        {this.state.searchresultline}



                <div className="bigbox">



            <div className="mainpage">
        {/* <Button variant="outline"> LEFT </Button> */}


                    {this.state.filteredItemsOnReturn.map((element,index)  =>
                      <Card className='itemcard'>
{/* TO GET PHOTO NAME UNCOMMENT NEXT LINE: */}
                   {/* {  console.log(`url(/assets/images/${element.title.replace(/[^a-zA-Z0-9 ]/g, "").substr(0,5).split(" ").join("_")}${element.artist.replace(/[^a-zA-Z0-9]/g, "").split(' ').join('_')}.jpg`)  } */}
                        {/* <div className='record' style={{backgroundImage: `url(/assets/images/${element.pic})`}}> */}
                        <div className='record' style={{backgroundImage: `url(/assets/images/${element.title.replace(/[^a-zA-Z0-9 ]/g, "").substr(0,5).split(" ").join("_")}${element.artist.replace(/[^a-zA-Z0-9]/g, "").split(' ').join('_')}.jpg`    }}>
                        </div>
                          <table>
                        <div className="title">{element.title}</div>
                        <div className="artist">{element.artist}</div>
                        <div className="title">${element.price}</div>
                        <div className="cartbutton">  <Button  onClick = {this.addToOrder.bind(this, element)} variant="outlined" color="primary"><Icon style={{paddingRight: '6px'}}>add_shopping_cart</Icon>
                        Add to Cart
                    </Button>

                        </div>

                        <tr className="labelandnum">{element.label}{element.labelnum}</tr>

                      </table>

                      </Card>
                  )}
                  </div>


            </div>

{/********** SIDE BAR *************/}
                <div id="mySidenav" class="sidenav">
                  <a class="closebtn" onClick={this.closeNav.bind(this)}> &#9776;</a>
                  <div id="orderheader">

                  </div>


                  <div id="side-order">

                    <div id="alt-message" style={{display: altdisplay}}>
                    Add items to your cart...
                    </div>

                  <div>
                    {/* <div className='inorder'> */}

                        <div id='ordervis' style={{display: this.state.orderdisplay}}>


                                <Typography variant="title" id="tableTitle" style={{position: 'center', display: 'flex', justifyContent: 'center'}}>
                                  My Order
                                </Typography>


<table className = "side-order-table">
  <tr className = "side-order-table-toprow">
    <td className = "side-order-table-borderbottom">
        Title
    </td>
    <td className = "side-order-table-borderbottom">
        Quantity
    </td>
    <td className = "side-order-table-borderbottom">
      Price
    </td>
    <td className = "side-order-table-borderbottom">
    </td>
  </tr>

  {this.state.myorder.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((element,index)=>

       <tr key={index}>
        <td>  {element.title} <br/> {element.artist}</td>
  <td> {1}</td>
    <td> ${element.price}</td>
      <td> <Icon onClick={this.handleClickOpen.bind(this,element,index)}>delete</Icon>
      {/* {console.log(this.state.open)} */}
      <Dialog
        open={this.state.open[index]}
        onClose={this.handleClose.bind(this,element,index)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{<Icon>delete</Icon>}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Remove {element.title} from order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose.bind(this,element,index)} color="primary">
            Disagree
          </Button>
          <Button onClick={this.removeItem.bind(this, element, index)} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog></td>

      </tr>
  )}

    </table>





















                <TableFooter>

                <TableRow>
                <TableCell component="th" scope="row" colSpan={2}>
                Total:
                </TableCell>
                <TableCell numeric colSpan={1} className="quantitycell">${this.getTotalPrice()}</TableCell>
                <TableCell numeric colSpan={1} className="quantitycell"></TableCell>
                </TableRow>
                <Button onClick={this.clearcart.bind(this)}>clear order</Button>


                <TableRow>
                <TablePagination
                colSpan={3}
                count={this.state.myorder.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                // ActionsComponent={this.TablePaginationActionsWrapped}
                />
                {/* {console.log(this.state.rowsPerPage)} */}
                </TableRow>
                </TableFooter>


                    {/* </div> */}

                    </div>

                  {/* </div> */}
                {/* //ORDER above */}

                  {/* END OF ADD ITEMS TO CART */}
                </div>

              </div>
                </div>

                where is this
        </div>







        <div className="top-search-box">




        <TextField
                id="search-field"
                label="Search"
                style={{width: '200px', fontSize: '10px'}}
                value={this.state.search}
                onChange={this.SearchEvent.bind(this)}
                onKeyPress={(ev) => {
                  // console.log(`Pressed keyCode ${ev.key}`);
                  if (ev.key === 'Enter') {
                    this.catchReturn()
                    ev.preventDefault();
                  }}}
                margin="normal"
              />




              <div className="searchbutton">
                <Icon style={{paddingRight: '6px', color: 'black'}}>search</Icon>
              </div>
              </div>
        {/* <input type="text" placeholder="Search Vinyl" value={this.state.search} onChange={this.SearchEvent.bind(this)}/> */}






{/* ORDER BUTTON  */}
          {/* <div className="orderbutton" onClick={this.toggleOrder.bind(this)}><Button variant="contained" color="primary"><Icon style={{padding: '0px'}}>shopping_cart</Icon>
          <div>Total: ${this.getTotalPrice()}</div>
        </Button> */}
            {/* <div className="ordertext">my order
      </div> */}
          {/* </div> */}
{/* ORDER BUTTON END */}







        </div>


        <input type="text" value={this.state.search} onChange={this.SearchEvent.bind(this)}/>
      </div>
    );
  }
}

export default withAuth(myFootable);
