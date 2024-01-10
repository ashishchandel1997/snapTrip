
# Snaptrip Project Documentation

## Components: Routes
      - App   
  |- HomeComponents
  |- AboutUs
  |- Login
  |- Register
  |- FilteredSelection
  |- FullBlog
  |- BlogComponent
  |- SmartTripGuide
  |- ContactUs
  |- TermsAndConditions
  |- PrivacyPolicy
  |- ChartMap <!-- Main Component for showing Chart -->
  |- HowSnaptripWorks
  |- TripSummary <!-- Main Component for Google Map Chart -->
  |- CopyChart


  - If user is logged in:
    |- SavedTrips
    |- Wishlist
    |- Profile

  
  

  #Component Folder has all the components of Hero page.
  #Pages Folder consist of all the pages and routes components.

  #There are 3 others file in #src folder :
  |- CurrentUser  <!-- for storing user is logged in and out data from api to session storage -->
    |- NavBar <!--  Navbar of the application-->
        |- ScrollToTop  <!-- To scrool to the top when routes changes-->


#Component Folder also has 1 more folder in it i.e #AuthComponent  which has:
|- Login  <!--Login component has login functionality like login with google,facebook and email id -->
    |-MapContainer <!-- Map Container has google map and all the functionalities showing on map is written in it -->
        |-Register <!-- Register component has registration process-->
            |- Snackbar <!-- Snackbar is used to display info-->
            


#Pages folder  has 1 file which is the backbone of the application :
-TripSummary   <!-- This file has 4 components called in it..and all 4 components have dependencies on each other-->
        |-MapContainer <!--Its google map container  -->
                            <!-- these 3 components will open sidebars.  -->
        |-CustomizeSingleModal  <!-- This component is called when user click on city name and this component has drag and drop functionality on attractions -->
        |-CustomizeMultipleModal   <!-- This component is called when itinerary is finalized and user want to view there itinerary--> 
        |-CustomizeAllModal  <!-- This component is automatically called and it will display country data and it is right sidebar-->
        