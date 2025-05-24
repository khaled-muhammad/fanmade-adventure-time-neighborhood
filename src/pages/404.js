import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { Home, MapPin, Users, Sparkles, ArrowLeft } from 'lucide-react';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Neighborhood SF Trip Challenge</title>
        <meta name="description" content="Algebraic! This page doesn't exist in our adventure!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <div className="text-center py-20">
          {/* Fun Adventure Time 404 Design */}
          <div className="mb-8">
            <div className="text-9xl mb-4 animate-bounce">🏔️</div>
            <div className="text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift">
                404
              </span>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Algebraic!
              </span>
              <br />
              You've wandered off the path!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Looks like you've ventured into uncharted territory in the Land of Ooo! 
              This page doesn't exist in our adventure, but don't worry - every great explorer gets lost sometimes.
            </p>
            
            <div className="flex items-center justify-center gap-3 mb-8">
              <Sparkles className="text-accent animate-wiggle" size={24} />
              <span className="text-lg font-semibold text-primary">
                Let's get you back to the main quest!
              </span>
              <Sparkles className="text-accent animate-wiggle" size={24} />
            </div>
          </div>

          {/* Navigation Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <Link href="/" className="card cursor-pointer group" style={{ background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(135, 206, 235, 0.1))' }}>
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                  <Home size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Adventure Home</h3>
                <p className="text-gray-600">Return to the Tree Fort (homepage) and start your quest over!</p>
              </div>
            </Link>

            <Link href="/dashboard" className="card cursor-pointer group" style={{ background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 0, 0.1))' }}>
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-warning rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                  <MapPin size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Adventure Dashboard</h3>
                <p className="text-gray-600">Check your quest progress and see how everyone's doing!</p>
              </div>
            </Link>

            <Link href="/participants" className="card cursor-pointer group" style={{ background: 'linear-gradient(135deg, rgba(50, 205, 50, 0.1), rgba(154, 205, 50, 0.1))' }}>
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-success to-grass-green rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                  <Users size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Adventure Party</h3>
                <p className="text-gray-600">Meet all the brave adventurers on their SF quest!</p>
              </div>
            </Link>
          </div>

          {/* Fun Adventure Time Quote */}
          <div className="card max-w-2xl mx-auto" style={{ background: 'linear-gradient(135deg, rgba(123, 104, 238, 0.1), rgba(255, 105, 180, 0.1))' }}>
            <div className="card-body text-center">
              <div className="text-4xl mb-4">🗡️</div>
              <blockquote className="text-lg italic text-gray-700 mb-4">
                "Dude, sucking at something is the first step to being sorta good at something."
              </blockquote>
              <p className="text-sm text-gray-500 font-semibold">- Jake the Dog</p>
              <p className="text-xs text-gray-400 mt-2">
                (Don't worry, finding the right page is part of the adventure!)
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12">
            <Link href="/" className="button-primary text-lg px-8 py-4 inline-flex items-center gap-3">
              <ArrowLeft size={20} />
              Return to Adventure Home
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
} 