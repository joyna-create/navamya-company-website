#!/usr/bin/env python3
"""
Simple HTTP Server for Navamya Website
Run this script to serve the website locally without XAMPP
"""
import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configuration
PORT = 8000
HOST = 'localhost'

def main():
    # Change to the directory containing this script
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    # Create server
    handler = http.server.SimpleHTTPRequestHandler
    
    try:
        with socketserver.TCPServer((HOST, PORT), handler) as httpd:
            url = f"http://{HOST}:{PORT}"
            print(f"🚀 Navamya Website Server Starting...")
            print(f"📂 Serving files from: {script_dir}")
            print(f"🌐 Server running at: {url}")
            print(f"📱 Open your browser and go to: {url}")
            print(f"🛑 Press Ctrl+C to stop the server")
            print("-" * 50)
            
            # Try to open browser automatically
            try:
                webbrowser.open(url)
                print(f"✅ Browser opened automatically")
            except:
                print(f"❌ Could not open browser automatically")
                print(f"   Please open {url} manually in your browser")
            
            print("-" * 50)
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print(f"\n🛑 Server stopped by user")
    except OSError as e:
        if e.errno == 10048:  # Port already in use
            print(f"❌ Port {PORT} is already in use")
            print(f"   Please close other applications using this port or change PORT in this script")
        else:
            print(f"❌ Error starting server: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    main()
