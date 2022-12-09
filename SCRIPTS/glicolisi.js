import GameRoundManager from "./gameRound.js";

const gameRoundManager = new GameRoundManager([
    [/glucosio/],
    [/glucosio( |-)?6( |-)?fosfato/],
    [/fruttosio( |-)?6( |-)?fosfato/],
    [ /fruttosio( |-)?1,6( |-)?bifosfato/],
    [/gliceraldeide( |-)?3( |-)?fosfato/],
    [/2( |-)?diidrossiacetone ?fosfato/],
    [/1,3( |-)?bifosfoglicerato/],
    [/3 ?fosfoglicerato/],
    [/2 ?fosfoglicerato/],
    [/fosfoenol ?piruvato/],
    [/piruvato/],
]);

