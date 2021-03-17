
$(document).ready(function(){
	$.ajax({
		method: 'GET',
		url: '/api/signed-in'
	}).then(function(res){
		if(res.message){
			if(res.message === "signed-in"){
				var aProfile = $('<a>',{
					type: 'button',
					href: '/profile/' + res.user_id,
					text: 'Profile'
				});
				aProfile.addClass('btn btn-success sign-buttons');
				var aLogout = $('<a>',{
					type: 'button',
					text: 'Logout',
					id: 'main-page-logout-button'
				});
				aLogout.addClass('btn btn-danger sign-buttons');
			
				$('#direct-buttons').append(aProfile).append(aLogout);

				$('#sign-up-button').attr('disabled', true);
				$('#sign-in-button').attr('disabled', true);
			//add dog functions and show dogs div
			$('.dogs').show();
			var populateDogsList = function() {
				$.ajax({
					method: 'GET',
					url: '/dogs',
					success:function(res){
						$(".dogs-list").empty();
						$(".dog-breed-select").empty();
			
						//populating a default option for the dogs dropdown
						var defaultOption = $("<option>");
						defaultOption.attr("selected", true).attr("disabled", true).attr("hidden", true)
						defaultOption.text("Select a Dog Breed");
						$(".dog-breed-select").append(defaultOption);
			
						res.data.forEach((dog) => {
							//populating dogs in the unordered list
							let dogBreedLi = $("<li>");
							let dogBreedAnchor = $("<a>",{
								href: "/dogs/" + dog.breed.split(" ").join("+"),
								text: dog.breed
							})
							dogBreedAnchor.text(dog.breed);
							dogBreedLi.append(dogBreedAnchor)
							$(".dogs-list").append(dogBreedLi);
			
							//populating dogs in the select dropdown
							let dogBreedOption = $("<option>");
							dogBreedOption.text(dog.breed);
							dogBreedOption.val(dog.breed);
							$(".dog-breed-select").append(dogBreedOption);
						})
					}
				});
			}
			populateDogsList();

			var insertDogBreed = function() {
	
			$('#insert-dog-breed-form').on('submit', function(e){
				e.preventDefault();

				var dogBreedPostBody = {
					breed: $("#breed-input").val(),
					origin: $("#origin-input").val(),
					size: $("#size-input").val(),
					average_life_span: $("#average-life-span-input").val()
				};

			// setting up this client-side post to communicate with the post that we created on the server-side
				$.ajax({
					method: 'POST',
					url: '/dogs',
					data: JSON.stringify(dogBreedPostBody),
					contentType: 'application/json',
					success:function(res){
						$("#successful-post").empty();
						$("#error-message").empty();
						// this is the callback on the client side
						// this is where the response from the server will end up
						// console.log(res)
						if(res.success){
							$("#successful-post").text("Successful Addition of Dog Breed :)");
							// re-populate the dogs list on a successful post so the new dog can
							// show up on the ui
							populateDogsList();
							$(".post-breed-inputs").val("");
						} else {
							$("#successful-post").text("NO Luck Adding Dog Breed.")
							if(res.error.sqlMessage === "Column 'breed' cannot be null"){
								$("#error-message").text("Error: Can not leave 'Breed' input Empty")
							}
						}
					}
				});
			});
		}
		insertDogBreed();
		var updateOrDeleteBreed = function() {
			$(".update-or-delete-select").on("change", function(e){
					$(".dynamic-inputs").empty();
				if(e.target.value == "update"){
						const fields = ["breed", "origin", "size", "average_life_span"];
						let fieldsSelect = $("<select>");
						fieldsSelect.attr("id", "fields-select");
		
						var defaultOption = $("<option>");
						defaultOption.attr("selected", true).attr("disabled", true).attr("hidden", true)
						defaultOption.text("Select a Field to Update");
						fieldsSelect.append(defaultOption);
		
						fields.forEach((field) => {
							let fieldOption = $("<option>");
							fieldOption.text(field);
							fieldOption.val(field);
							fieldsSelect.append(fieldOption);
						})
						$(".dynamic-inputs").append(fieldsSelect);
		
						const inputDiv = $("<div>");
						const label = $("<label>");
						label.text("New Value");
						const input = $("<input>", {
							type: "text",
							placeholder: "Please Input New Value",
							id: "update-input"
						});
						inputDiv.append(label).append(input);
						$(".dynamic-inputs").append(inputDiv);
		
						let button = $("<button>");
						button.attr("id", "update-dog-breed")
						button.text("Update Dog Breed");
						$(".dynamic-inputs").append(button)
					} else {
						let button = $("<button>");
						button.attr("id", "delete-dog-breed")
						button.text("Delete Dog Breed");
						$(".dynamic-inputs").append(button)
					}
				});
		
			$(document).on('click', "#update-dog-breed", function(){
				const selectedDogBreed = $(".dog-breed-select").val();
				const fieldsSelectValue = $("#fields-select").val();
				const updatedValue = $("#update-input").val();
		
				const body = {
					column: fieldsSelectValue,
					updated_value: updatedValue,
					breed: selectedDogBreed
				}
		
			// setting up this client-side post to communicate with the post that we created on the server-side
				$.ajax({
					method: 'PUT',
					url: '/dogs',
					data: JSON.stringify(body),
					contentType: 'application/json',
					success:function(res){
						if(res.success){
							$("#successful-post").text("Successful Deletion of Dog Breed :)");
							// re-populate the dogs list on a successful post so the new dog can
							// show up on the ui
							populateDogsList();
							$(".post-breed-inputs").val("");
						} else {
							$("#successful-post").text("NO Luck Deleting Dog Breed.")
						}
					}
				});
			});
		
			$(document).on('click', "#delete-dog-breed", function(){
				const selectedDogBreed = $(".dog-breed-select").val();
				// setting up this client-side post to communicate with the post that we created on the server-side
				$.ajax({
					method: 'DELETE',
					url: '/dogs',
					data: JSON.stringify({breed: selectedDogBreed}),
					contentType: 'application/json',
					success:function(res){
						if(res.success){
							$("#successful-post").text("Successful Deletion of Dog Breed :)");
							// re-populate the dogs list on a successful post so the new dog can
							// show up on the ui
							populateDogsList();
							$(".post-breed-inputs").val("");
						} else {
							$("#successful-post").text("NO Luck Deleting Dog Breed.")
						}
					}
				});
			});
		}
		updateOrDeleteBreed();
				
			
		}
		} else {
			$('#sign-up-button').attr('disabled', false);
			$('#sign-in-button').attr('disabled', false);
			$('.dogs').hide();
		}
	});

	$(document).on('click', '#main-page-logout-button', function(){		
		$.ajax({
			method: 'DELETE',
			url: '/api/logout-user'
		}).then(function(res){
			window.location.href = "/"
		});
	})
	
});