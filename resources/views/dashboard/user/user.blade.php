
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
@extends('layouts.app')

@section('title', $title)

@section('sidebar')
    @parent
    <li>PHP</li>
@endsection

@section('content')
    <center>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </center>
@endsection
