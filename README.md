# Mic_assessment
An app to show items and load more functionality

# Ways to view the content
1. Open the index.html file in Firefox
2. Create a localhost like below 

	..* Download the folder in C:\vhosts\
	..* <VirtualHost *:80>
	
		  DocumentRoot "c:/vhosts/Mic_assessment"
		  
		  ServerName Mic_assessment.loc
		  
			<Directory "/">
			
				AllowOverride All
				
				Options  All
				
				Order allow,deny
				
				Allow from all
				
			</Directory>
			
	   </VirtualHost>
	   
