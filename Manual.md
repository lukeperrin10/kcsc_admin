# CHWL Admin Interface Manual

## Description

In this document we provide all necessary information on how Admin interface can be used to edit and update all information that is on Community Health West London (CHWL) website.

## 1. Log In

To protect Admin interface from unauthorized access the user is required to use predefined credentials to log-in. The required fields are email and password. After filling those fields with correct credentials and pressing Login button User will be redirected to General Dashboard.

*Preview of Log In interface*
![title](Images/logInPage.png)

## 2. Navigation

All content of the website can be edited using forms. To Navigate to the particular form use the sidebar. On mobile the sidebar is accessable by clicking the hamburger menu <img src="Images/hamburger.png" width="30" height="auto" />

*Sidebar*  
<img src="Images/sidebar.png" width="100" height="auto" />

All forms are split into dashboards to make it easy to find a correct form. Following chapters will go through each dashboards in details.

## 3. General Dashboard

After logging in, you will be redirecting to General Dashboard that will let you edit information in Testimonials, site Navigation and Footer using corresponding form. Each form is collapsible by clicking the form's title.

*Previw General Dashboard*
![title](Images/generalDashboard.png)
*if all forms but Footer are collapsed*
![title](Images/generalDashboardCollapsed.png)

### 3.1 Editing Testimonials

Currently there are two testimonials that can be edited. You can change person's Name, Testimonial Text, Picture, Alt attribute that holds description of what is depicted on the picture for accessability purposes and link to the full article.

*example of testimonial form and corresponding card*  
<img src="Images/testimonialsForm.png" width="49%"/>
<img src="Images/testimonial.png" width="49%"/>

Once the necessary changes has been made, click the <img src="Images/submitButton.png" width="60"/> to update testimonials.

### 3.2 Editing Navigation

Admin interface provides ability to edit navigation tabs labels and where they lead. Be very careful with this feature as it is possible to break the scrolling on the Services page if incorrect ref parameters are provided (more on that later).

There are two types of Tabs: main and secondary. For main tabs only the label and visibility can be edited. The route will be auto generated based on label that put in (ex. News & Info => /news_info).

*main tabs on CHWL website*
<img src="Images/siteMainTabs.png"/>

Secondary Tabs come in two types, with and without ref. parameter. Secondary Tabs in section Services have this parameter as it is responsible for scroll effect. The ref parameter should be equal to the Title of the section to which it should scroll to.

*secondary tabs on CHWL website*
<img src="Images/siteSecondaryTabs.png"/>

*part of the navigation edit form*  
<img src="Images/navigationForm.png" width='300px'/>

Once the necessary changes has been made, click the <img src="Images/submitButton.png" width="60"/> to update navigation.

### 3.3 Editing Footer

The last form in the General Dashboard lets you update Footer information. You can update about CHWL text, copyright and accessability disclaimers. The character count is limited to preserve page layout.

*Footer form*  
<img src="Images/footerForm.png" />

Once the necessary changes has been made, click the <img src="Images/submitButton.png" width="60"/> to update footer.

## 4. Editing Page Information

*Previw Sections Dashboard*
![title](Images/sectionDashboardPreview.png)

Tab Sections in Sidebar will take you to the Dashboard to edit information listed on following pages of CHWL website: Services, About Organization, About Self Care and Information. To access forms of page you want to edit use top navigation menu.

*Top Navigation Menu*
![title](Images/sectionsTopNavigation.png)

Each form you see in the view corresponds to a section on the CHWL website. The order of form is also the same.

*example of section on CHWL website and corresponding form*  
<img src="Images/exampleOfSection.png" />

*and corresponding form*  
<img src="Images/sectionRegularForm.png" />

Forms are collapsible by clicking the header to reduce amount of scrolling.

*all forms apart from Plans are collapsed *  
<img src="Images/collapseForms.png" />

Form allows you to edit sections **Header**, **Description** by filling corresponding fields. The number of characters is limited to preserve the layout of the page.

The image can also be updated by uploading new one using the orange camera button <img src="Images/cameraButton.png" width="30"/>

Pay attention on the text field right below the image! It allow you to edit **alt** attribute that should have the description of what is depicted on the image. It is important for accessability purpose as this attribute is what will be available for screen readers.

Some sections have buttons, some don't. Currently there is no functionality to add or remove buttons but you can edit their label and the link to which they will redirect.

*example of two button form*  
<img src="Images/buttonsForm.png" width='300px'/>

After you made all necessary changes press <img src="Images/submitButton.png" width="60"/> button in the bottom right corner of the form to update the section on the CHWL website. If the update was successful you will see Success message in the bottom right corner of Error message if something went wrong

*example of success message*  
<img src="Images/successMessage.png" width='200px'/>

*example of error message*  
<img src="Images/errorMessage.png" width='200px'/>

Some section do not hold a picture. They will have simplified form with increased number of characters in the description.

*example of form without image*  
<img src="Images/sectionNoImage.png" />

### 4.1 Editing Partners Carousel

Other type of form is one to edit Our Partners carousel in About Organization view. It allows to separately edit section header by filling in the input and clicking Change Header button.

*form to edit carousel header*  
<img src="Images/carouselHeaderForm.png" />

The content of carousel cards is also editable. Firstly the visibility of card can be toggled using the switch. <img src="Images/visibleSwitch.png" width='30px'/> Secondly the image and the alt attribute can be updated. Thirdly the name of the partner organization and ist description, and lastly the partner's web and social media links. Each card is updated individually by pressing Submit button.

*example of form and corresponding card*  
<img src="Images/carouselCardForm.png" width="49%"/>
<img src="Images/exampleOfCard.png" width="49%"/>

There is also a functionality to add new card bu pressing <img src="Images/addCardButton.png" width='100px'/>. This will open a form that will let you create new card by filling required fields.
<img src="Images/createCardForm.png" width="49%"/>