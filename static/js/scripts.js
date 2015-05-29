$(function(){

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$(document).ready(function() {
    $( "#baseList, #myList" ).sortable({
      connectWith: ".draggable"
    }).disableSelection();
  });

$(function() {
    $( ".sortable" ).sortable();
    $( ".sortable" ).disableSelection();
  });

$(document).ready(function(){
	$("#surveySubmit").click(function(){
		var list = $("#surveyList").children();
		var obj = [];
		for(i = 0; i < list.length; i++){
			obj[i] = parseInt($(list[i]).attr("id"));
		}
		var csrftoken = getCookie('csrftoken');
		$.ajaxSetup({
	        beforeSend: function(xhr, settings) {
	        	xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        }
		});
		$.ajax({url:window.location.pathname, type:'POST', data:{"results":JSON.stringify(obj)}, 
			success:function(data, status, xhr) {
				window.location.pathname = xhr.getResponseHeader("Location").replace(/.*?:\/\/.*?\//, "");
			}
		});
	});
	
	$("#skillSubmit").click(function(){
		if($("#myList").children().length < 5 || $("#myList").children().length > 10){
			$("#skillMsg").html("Please choose between five and ten skills");
		}
		else{
			var list = $("#myList").children();
			var obj = [];
			for(i = 0; i < list.length; i++){
				obj[i] = parseInt($(list[i]).attr("id"));
			}
			var csrftoken = getCookie('csrftoken');
			$.ajaxSetup({
		        beforeSend: function(xhr, settings) {
		        	xhr.setRequestHeader("X-CSRFToken", csrftoken);
		        }
			});
			$.ajax({url:window.location.pathname, type:'POST', data:{"results":JSON.stringify(obj)}, 
				success:function(data, status, xhr) {
					window.location.pathname = xhr.getResponseHeader("Location").replace(/.*?:\/\/.*?\//, "");
				}
			});
		}
	});
	
	$("#job_submit").click(function(){
		if(($("#myList").children().length < 5 || $("#myList").children().length > 10) 
				&& !$("#current_skills").is(":checked")){
			$("#skillMsg").html("Please choose between five and ten skills");
		}
		else{
			var list = $("#myList").children();
			var obj = [];
			for(i = 0; i < list.length; i++){
				obj[i] = parseInt($(list[i]).attr("id"));
			}
			var csrftoken = getCookie('csrftoken');
			$.ajaxSetup({
		        beforeSend: function(xhr, settings) {
		        	xhr.setRequestHeader("X-CSRFToken", csrftoken);
		        }
			});
			var longterm;
			if ($("#longterm").is(":checked")){
				longterm = "longterm";
			}
			else{
				longterm = "";
			}
			var hq;
			if ($("#hq").is(":checked")){
				hq = "hq";
			}
			else{
				hq = "";
			}
			var change_skills;
			if ($("#current_skills").is(":checked")){
				change_skills = "false";
			}
			else{
				change_skills = "true";
			}
			$.ajax({url:window.location.pathname, type:'POST', data:{"results":JSON.stringify(obj), "title":$("#title").val(),
				"addr":$("#addr").val(), city:$("#city").val(), "state":$("#state").val(), "zip":$("#zip").val(), "date":$("#date").val(),
				"hq":hq, "longterm":longterm, "description":$("#description").val(),
				"paid":$("form").find("input:radio[name=paid]:checked").val(),
				"fulltime":$("form").find("input:radio[name=fulltime]:checked").val(),
				"change_skills":change_skills}, 
				success:function(data, status, xhr) {
					window.location.pathname = xhr.getResponseHeader("Location").replace(/.*?:\/\/.*?\//, "");
				}
			});
		}
		return false;
	});
});

$(document).ready(function(){
	$(".disable").change(function(){
		if(this.checked){
			$('.disabled').attr('disabled', 'disabled');
			$('.disabled').val('');
			$('.disabled').find("input").attr('disabled', 'disabled');
			$('.disabled').find("input").val('');
		}
		else{
			$('.disabled').removeAttr('disabled');
			$('.disabled').find("input").removeAttr('disabled');
		}
	});
});

$(document).ready(function(){
	$(".disable_all").change(function(){
		if(this.checked){
			$('.disabled_all').attr('disabled', 'disabled');
			$('.disabled_all').val('');
			$('.disabled_all').find("input").attr('disabled', 'disabled');
			$('.disabled_all').find("input").val('');
			$('.disabled_all').find("select").attr('disabled', 'disabled');
			$('.disabled_all').find("select").val('');
		}
		else{
			$('.disabled_all').removeAttr('disabled');
			$('.disabled_all').find("input").removeAttr('disabled');
			$('.disabled_all').find("select").removeAttr('disabled');
			$('.disabled_all').find("select")[0].selectedIndex = 0;
			$('.disabled_all').find(".disable").removeAttr('checked');
		}
	});
});

$(document).ready(function(){
	if($("#current_skills").is(":checked")){
		$("#new_skills").hide();
	}
	$("#current_skills").change(function(){
		if(this.checked){
			$("#new_skills").hide();
			$('#old_skills').show();
		}
		else{
			$("#new_skills").show();
			$('#old_skills').hide();
		}
	});
});
});