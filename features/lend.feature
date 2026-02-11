Feature: Ph-Stacey Landing Page

  Scenario: Heading on the main page
    Given I open the landing page
    Then the heading should contain "Курс з"
    And the heading should contain "обробки фото"
    When I click "Придбати курс" button
    Then I should be on the courses page
    When I navigate to the Author page
    Then I should be on the about page
    And the heading should contain "Анастасія"
