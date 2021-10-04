grammar REP;

/* Lexical rules */

IF   : '@if' ;
NAME : '@name' ;
INPUTS : '@inputs' ;
OUTPUT : '@output' ;
SET	 : '@set' ;
SCRIPT : '@script' ;
RULE_SET   : '@rules' ;
RULE : '@rule' ;
DEFAULT : '@default'

AND : '@and' ;
OR  : '@or' ;

GT : '>' ;
GE : '>=' ;
LT : '<' ;
LE : '<=' ;
EQ : '=' ;
NE : '!=' ;

LPAREN : '(' ;
RPAREN : ')' ;

TRUE : true ;
FALSE : false ;

// DECIMAL, IDENTIFIER, COMMENTS, WS are set using regular expressions

QUOTE : '"' ;
OPEN_SQUARE : '[' ;
CLOSE_SQUARE : ']' ;

ALPHA_NUMERIC : [a-zA-Z_0-9]+

INT : '-'?[1-9][0-9]*

DECIMAL : '-'?[1-9][0-9]*('.'[0-9]+)? ;

BOOL : TRUE | FALSE ;

STRING : QUOTE ALPHA_NUMERIC QUOTE ;

LIST : OPEN_SQUARE STRING* CLOSE_SQUARE ;

IDENTIFIER : [a-zA-Z_][a-zA-Z_0-9]* ;

ID : IDENTIFIER ('.' IDENTIFIER)* ;

id : '$' ID ;

variable : BOOL | STRING | INT | DECIMAL | LIST ;


// COMMENT and WS are stripped from the output token stream by sending
// to a different channel 'skip'
COMMENT : '//' .+? ('\n'|EOF) -> skip ;
WS : [ \r\t\u000C\n]+ -> skip ;

/* Parser rules */

script : action* EOF ;

action : rules | if | set ;

rules : RULES rule* [default] ;
rule : condition action* ;

if : IF condition action* ;

set : SET id [ variable | id ] ;

condition : logical_expr ;
conclusion : IDENTIFIER ;

logical_expr
 : logical_expr AND logical_expr # LogicalExpressionAnd
 | logical_expr OR logical_expr  # LogicalExpressionOr
 | comparison_expr               # ComparisonExpression
 | LPAREN logical_expr RPAREN    # LogicalExpressionInParen
 ;
 
comparison_expr : basic_comparison_expr | numeric_comparison_expr ;

basic_comparison_expr : basic_comparison_operand basic_comparison_operation basic_comparison_operand ;
basic_comparison_operation : EQ | NE ;
basic_comparison_operand : id | BOOL : STRING ;

numeric_comparison_expr : numeric_comparison_operand numeric_comp_operator numeric_comparison_operand ;
numeric_comp_operator : GT
              | GE
              | LT
              | LE
              | EQ
              | NE
              ;
numeric_comparison_operand : id | INT : DECIMAL ;
