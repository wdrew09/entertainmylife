import React from 'react';
import { Route, Redirect } from 'react-router';

export default (
    <Route>
        <Route path="/:pagename/:id"/>
        <Route path="/about-us/"/>
        <Route path="/contact-us/"/>
        <Route path="/advertise/"/>
        <Route path="/disclosure/"/>
        <Route path="/disclaimer/"/>
        <Route path="/privacy-policy/"/>
        <Route path="/article/:name/:id"/>
        <Route path="/submit"/>
        <Redirect from="/:pagename" to="/:pagename/1" />
        <Redirect from="/" to="/homepage/1" />
        <Route/>
    </Route>
);