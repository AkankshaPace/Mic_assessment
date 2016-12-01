# Mic_assessment
An app to show items and load more functionality

# Ways to view the content
a. Open the index.html file in Firefox
b. Create a localhost like below 
	1. Download the folder in C:\vhosts\
	2. <VirtualHost *:80>
		  DocumentRoot "c:/vhosts/Mic_assessment"
		  ServerName Mic_assessment.loc
			<Directory "/">
				AllowOverride All
				Options  All
				Order allow,deny
				Allow from all
			</Directory>
	   </VirtualHost>
