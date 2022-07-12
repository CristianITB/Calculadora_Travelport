Feature: Calculator

Background: 
    Given a user opens the app
    
Scenario: Default display screen
Then in the display screen should be show a 0

Scenario Outline: Clicking non-operators screen buttons
Given in the display screen the number <numberOnScreen> is shown
When the user press the <Button> button
Then in the display screen should be show a <Button>

Examples:
|numberOnScreen|Button| resultDisplay |
|             1|   0  |            10 |
|             0|   1  |             1 |
|             0|   2  |             2 |
|             0|   3  |             3 |
|             0|   4  |             4 |
|             0|   5  |             5 |
|             0|   6  |             6 |
|             0|   7  |             7 |
|             0|   8  |             8 |
|             0|   9  |             9 |
|             0|   ,  |            0, |
|             1|   C  |             0 |
|             1| +/-  |           -1  |

Scenario Outline: Clicking operators screen buttons
When the user press the <Button> button
Then the <Button> button should be highlighted

Examples:
|Button|
|   +  |
|   -  |
|   /  |
|   *  |

Scenario Outline: Pressing non-operators keys
Given in the display screen the number <numberOnScreen> is shown
When the user press the <Key> key
Then in the display screen should be show a <Button>

Examples:
|numberOnScreen|Key   | resultDisplay |
|             1|   0  |            10 |
|             0|   1  |             1 |
|             0|   2  |             2 |
|             0|   3  |             3 |
|             0|   4  |             4 |
|             0|   5  |             5 |
|             0|   6  |             6 |
|             0|   7  |             7 |
|             0|   8  |             8 |
|             0|   9  |             9 |
|             0|   ,  |            0, |
|             1|  ESC |             0 |

|             1|   -  |            1  | *****************************************************
|            -1|   +  |            -1  |

Scenario Outline: Pressing operators keys
When the user press the <Key> key
Then the <Key> button should be highlighted

Examples:
|Key   |
|   +  |
|   -  |
|   /  |
|   *  |

Scenario Outline: Writing numbers 
Given in the display screen the number <numberOnScreen> is shown
When the user press the number <Button>
Then in the display screen should be show a <resultDisplay>

Examples:
|numberOnScreen|Button|resultDisplay| 
|             0|   0  |            0| 
|             7|   0  |           70|
|             0|   1  |            1|
|           123|   4  |         1234|
|          1234|   8  |        12348|
|             0| ,    |           0,|
|          1234| ,    |        1234,|
|         1234,| 1    |       1234,1|
|        1234,1| ,    |       1234,1|
|             0| +/-  |           0 |
|             7| +/-  |          -7 |
|          1234| +/-  |        -1234|

Scenario Outline: Writing more than 10 digits
Given in the display screen the number 9999999999 is shown
When the user press <Action>
Then in the display screen should be show a 9999999999

Examples:
|Action| 
| 7    |
| ,    |
| +/-  |

Scenario Outline: Performing two number operations
Given in the display screen the number <numberOnScreen> is shown
When the user press the <operator>
And the user writes the number: <secondNumber>
And the user press the =                              
Then in the display screen should be show a <resultDisplay>

Examples:
|numberOnScreen|operator |secondNumber|resultDisplay|
|            24|    +    |           6|           30|
|          24,2|    +    |         6,4|         30,6|
|         13,14|    +    |       2,781|       15,921|
|            10|    +    |          -5|            5|
|           -20|    +    |          10|          -10|
|            24|    -    |           6|           18|
|             6|    -    |          24|          -18|
|             6|    -    |         -24|           30|
|          24,2|    -    |         6,4|         17,8|
|         13,14|    -    |       2,781|       10,359|
|            10|    *    |           8|           80|
|           5,2|    *    |           8|         41,6|
|         36,25|    *    |       7,496|       271,73|
|            10|    *    |          -8|          -80|
|           -10|    *    |          -8|           80|
|           -10|    *    |           8|          -80|
|            10|    /    |           2|            5|
|            84|    /    |         4,3|   19,5348837|
|         23,58|    /    |       10,14|   2,32544379|
|            10|    /    |          -2|           -5|
|           -10|    /    |           2|           -5|
|           -10|    /    |          -2|            5|

Scenario Outline: Performing two number operations with a result number with more than 10 digits
Given in the display screen the number 9999999999 is shown
When the user press <operator>
And the user writes the number: <secondNumber>
And the user press = 
Then in the display screen should be show ERROR

|numberOnScreen|operator |secondNumber|
|     999999999|    +    |           1|
|            -1|    -    |  -999999999|
|     999999999|    *    |           2|
|     999999999|    /    |         0,1|

Scenario Outline: Clicking two different operation buttons
Given in the display screen the number <firstNumber> is shown
When the user press <Button>
And the user press <Button2>
And the user writes the number: <secondNumber>
When the user press the =  
Then in the display screen should be show a <resultDisplay>

|firstNumber|Button|Button2|secondNumber|resultDisplay|
|         12|   +  |   /   |           6|            2|
|       1234|   -  |   +   |          31|         1265|
|       9,26|   *  |   *   |       2,15 |       19,909|

Scenario: Division with 0
Given in the display screen the number 23 is shown
And the user press /
And the user writes the number: 0
When the user press the =  
Then in the display screen should be show ERROR

Scenario Outline: Doing an operation without a second number
Given in the display screen the number 23 is shown
And the user press +
And the user press the = 
Then in the display screen should be show ERROR







display = 1 place for the sign + 10 digits for the numbers (What happens with the comma¿¿¿)
!ALTERNATIVE: Using the Enter keyboard button as the equal button -> Inputting the keyboard as well
Getting results without "=" (using operators)
Do We need to clarify taht we can't change the sign of the numbers using the keyboard? -> ALT
Can we move over the screen buttons using the TAB key and clicking on it using space key?