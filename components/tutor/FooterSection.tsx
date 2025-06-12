"use client"
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Clock,
  Bot,
  Smartphone,
  Calendar,
  Shield,
  Zap,
  Users,
  Star,
  CheckCircle,
  Heart,
  Activity,
  Home,
  LogIn,
  BookOpen,
  LayoutDashboard,
  Menu,
  X,
  User,
  Settings,
  Bell,
  Search,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">SHICo</h2>
                <p className="text-emerald-400 text-sm">Healthcare Platform</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              Revolutionizing healthcare in Cameroon with AI-powered solutions
              that eliminate wait times and enhance patient care.
            </p>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 bg-gray-800 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-colors group">
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-colors group">
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-colors group">
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                "Home",
                "About Us",
                "Services",
                "Contact",
                "Privacy Policy",
                "Terms of Service",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  Bamenda, North-West Region, Cameroon
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+237 123 456 789</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">hello@shico.cm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2024 SHICo. All rights reserved. Proudly serving Cameroon.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-emerald-400 text-sm">
              <Shield className="w-4 h-4" />
              HIPAA Compliant
            </span>
            <span className="flex items-center gap-2 text-emerald-400 text-sm">
              <CheckCircle className="w-4 h-4" />
              ISO Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
