Feature: Back to Top Button

   Scenario: Happy Path Scroll to Top
   Given I load the page that has the backToTop Component
   When I scroll down the page
   Then The backToTop button will appear
   When I click on the backToTop button
   Then the page will scroll to the top