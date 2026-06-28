"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, ChevronRight } from "lucide-react";
import HeroImage from '@/image/hero_Image.png';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[65vh] bg-gradient-to-br from-[#fdfdfca5] via-[#F0EDE6] to-[#E8E4DA] flex items-center overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-100/20 rounded-full blur-3xl"></div>
      </div>

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300"></div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100/60 text-emerald-800 rounded-full text-xs font-semibold tracking-wide border border-indigo-200/30">
              <Sparkles className="w-3 h-3" />
              <span>Discover Original Ebooks</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#13131F] leading-[1.08] tracking-tight">
              Discover Your
              <br />
              Next Great
              <br />
              <span className="text-[#4F46E5]">Read</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#55555F] leading-relaxed max-w-md mx-auto lg:mx-0">
              Connect with fellow book lovers, discover original ebooks from
              talented writers worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-1">
              <Link
                href="/browse"
                className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#13131F] hover:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-gray-900/20 hover:shadow-gray-900/30 hover:scale-105 text-sm"
              >
                <BookOpen className="w-4 h-4" />
                <span>Browse Ebooks</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#"
                className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white/80 backdrop-blur-sm hover:bg-white text-[#13131F] font-semibold rounded-lg transition-all duration-300 border border-gray-200/50 hover:border-indigo-200 hover:shadow-lg hover:scale-105 text-sm"
              >
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-2">
              {[
                { number: "10K+", label: "Ebooks" },
                { number: "5K+", label: "Writers" },
                { number: "50K+", label: "Readers" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-xl font-bold text-[#13131F]">
                    {stat.number}
                  </p>
                  <p className="text-[10px] text-[#55555F] uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-2xl mx-auto">
              {/* Floating Icons */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl rotate-12 shadow-lg flex items-center justify-center text-2xl">
                📚
              </div>
              <div className="absolute -bottom-4 -left-4 w-11 h-11 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full shadow-lg flex items-center justify-center text-xl">
                ⭐
              </div>
              <div className="absolute top-1/2 -right-8 w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full shadow-lg flex items-center justify-center text-lg hidden lg:flex">
                📖
              </div>

              {/* Image Container - Full size */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/5">
                <Image
                  src={HeroImage}
                  alt="Fable Ebook Platform"
                  width={800}
                  height={600}
                  priority
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-hero.png";
                  }}
                />
              </div>

              {/* Bottom Glow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-gradient-to-r from-indigo-200/20 via-purple-200/20 to-pink-200/20 blur-2xl rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
