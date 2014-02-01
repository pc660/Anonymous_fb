var a_facebook_api = {
	
	api_url: 'http://afb-extension.com/api/',
		
	getPostFromDB: function(post_list, return_func){
		
		if(typeof return_func!='function') return_func = function(){};
		
		//
		
	
		
		var default_data = {
			string: null,
		};

		
		
		//alert('sss');

		
	       
		$.post( "http://anonymous.comze.com/test2.php", {string:post_list},function(data1)
		{
		    // return data1;
		    //alert(123);
		    //data1 = jQuery.parseJSON(data1);
		    var i=0;
		    var array=new Array();
		    var object=new Array();
		    var data="";
		    var flag=0;
		    for(i=0;i<data1.length;i++)
			{
			    if(flag==1)
				{
				   
				    if(data1[i]=='}')
					{
					    data+=data1[i];
					    array.push(data);
					    //    alert(data);
					    data='';
					    //alert(data)
					    flag=0;
					    continue;
					}
				    data+=data1[i];
				    
				}

			    if(data1[i]=='{')
				{
				    data+=data1[i];
				    flag=1;
				}

			}
		   
		    for(i=0;i<array.length;i++)
			{
			    var temp=JSON.parse(array[i]);
			    object.push(temp);
			}
		    
	    		    return_func(data1);
		  

		}


);

		
		var url = this.api_url + '?act=post_list&post_list=' + post_list_string;
	
		
	},
	addAnswerToDB: function(data, return_func)
	{
		var default_data = {
			answer1: "",
			answer2: "",
			answer3: "",
			post_id:1
			
		};
		console.log(data);
		data = jQuery.extend(default_data, data);
		//console.log(data);
		if(!data['post_id']){
			return false;
		}
		//alert(data['post_id'])
		$.post( "http://anonymous.comze.com/test1.php", data);
		
		
	}
	addPostToDB: function(data, return_func){
		
	//	if(typeof return_func!='function') return_func = function(){};
		
		//
		alert(1);
		var default_data = {
			 message:"";
	    post_id:1
			
		};
		
		//console.log(data);
			data = jQuery.extend(default_data, data);
		//console.log(data);
		if(!data['post_id'] || !data['answer1']){
			return false;
		}
		
		$.post( "http://anonymous.comze.com/test1.php", data);
			
			return_func(true);

		}).error(function(){
			
			return_func(false);
			
		});
		
	},
	
	listPostToString: function(post_list){

		var post_list_string = '';
		
		for(i in post_list){
			
			var post_id = post_list[i];
			
			if(typeof post_id!='number') continue;
			
			//
			
			post_list_string += post_id + ',';
			
		}
		
		if(post_list_string==''){
			
			return false;
			
		}
		
		return post_list_string.substr(0, post_list_string.length-1);

	}
	
};


chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		
		if(!request.method){
			
			return false;
			
		}
		alert(request.method)
		if(request.method=='postList' && request.post_list){
		    // alert(1);
			a_facebook_api.getPostFromDB(request.post_list, function(data){
				//alert(data);
						//console.log(data);
				//sendResponse(data);
				//	message=data;
				//	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				//	chrome.tabs.sendMessage(tabs[0].id, {data: data}, function(response) {});  
				//   });
						sendResponse(data);
			       
			});
			
		} else if(request.method=='postAdd' && request.post_data){
			//console.log(request.post_data);	
			a_facebook_api.addPostToDB(request.post_data, function(data){
				
				sendResponse(data);
				
			});
			
		}
		else if(request.method=='answerAdd' && request.post_data)
		{
			//console.log(request.post_data);
			a_facebook_api.addAnswerToDB(request.post_data, function(data){
				
				sendResponse(data);
				
			});	
		}
		//	alert(message);
		
		
		
	}
);

