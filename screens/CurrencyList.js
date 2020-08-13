import React from 'react';
import { View , Text , TouchableOpacity , Modal ,FlatList ,Image , Alert } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Icon } from 'react-native-elements'




export default class CurrencyList extends React.Component{
	state ={
		modalVisible : false,
		currency : [],
		currencyData : [],
	}

	componentDidMount(){

		fetch('https://api.nomics.com/v1/currencies/ticker?key=ccf76bbe102472e2814320972d8947f7&interval=ytd')
		.then((response) => response.json())
  		.then((data) => {
    	
    	this.setState({currency:data})
    	console.log('are',this.state.currency);
  		})
    	.catch((error) => {
     	console.error('err',error);
    	})
   
	}

	render(){
		return(
			<View>
			<FlatList 
					data = {this.state.currencyData}
					nestedScrollEnabled
					 
					keyExtractor = {id => this.state.currencyData.id}
					renderItem = {({item,index})=>{
					return (
					<TouchableOpacity onLongPress={()=>{
						Alert.alert("Delete currency"," ",[
       	 {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
        	this.state.currencyData.splice(index,1) 
        	this.setState({currencyData : this.state.currencyData})
        }}
      ])
					}}>
					<View style={{flex:1,margin:4,padding:4}}>
					<View style={{flexDirection:'row',flex:1}}>
					<SvgUri
    				width={60}
    				height={60}
    				uri={item.logo_url}
 					 />
 					 <View style={{margin : 4,flex:1}}>
					<Text style={{padding:4,fontSize:16,textAlign:'justify',fontWeight:'bold'}}>{item.name}</Text>
					<Text style={{marginLeft:4,fontSize:14,textAlign:'justify'}}>{item.symbol}</Text>
					</View>
					 <View style={{margin : 4}}>
					<Text style={{padding:4,fontSize:14,textAlign:'justify',fontWeight:'bold'}}> $ {item.price}</Text>
					<View style={{flexDirection:'row'}}>
					{
						item.price_change_pct > 0 ?
						<Text style={{marginLeft:4,fontSize:14,textAlign:'justify'}}> {item.price_change.price_change_pct} </Text> :
						<Text style={{marginLeft:4,fontSize:14,textAlign:'justify'}}> + {item.price_change.price_change_pct} </Text>
					
					
					}
					
					</View>
					</View>
					</View>
					</View>
					<View
  					style={{
    				borderBottomColor: '#D3D3D3',
    				borderBottomWidth: 1,
 				 	}}
					/>
					
					</TouchableOpacity>
					)
					}}
				/>
			
         
			<TouchableOpacity onPress={()=>{
				this.setState({modalVisible:true})
			}}>
			<Text style={{fontSize:16,alignSelf:'center',padding:4,margin:10}}> + Add a Cryptocurrency</Text>
			</TouchableOpacity>
			<Modal
       		 animationType="slide"
        	transparent={false}
        	visible={this.state.modalVisible}
        	
      		>
        	<View>
          	
          	<TouchableOpacity>
          	<View style={{padding:4,margin:6}}>
          	
            <Text style={{alignSelf:'center',margin:6,padding:4,fontSize:14}}>Cryptocurrencies</Text>
            </View>
            </TouchableOpacity>
            
            <FlatList 
					data = {this.state.currency}
					nestedScrollEnabled
					 
					keyExtractor = {id => this.state.currency.id}
					renderItem = {({item})=>{
					return (
					<TouchableOpacity onPress={()=>{
						this.setState({ currencyData:[...this.state.currencyData, {name:item.name,symbol:item.symbol,logo_url:item.logo_url,price:item.price,price_change:item.ytd}]})
						this.setState({modalVisible:false})
					}}>
					<View style={{flex:1,margin:4,padding:4}}>
					
					<Text style={{padding:4,fontSize:16,textAlign:'justify',fontWeight:'bold'}}>{item.name}</Text>
					
					</View>
					</TouchableOpacity>
					)
					}}
				/>
			
         
          
        </View>
      </Modal>
			</View>
			)
	}
}