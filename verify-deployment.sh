#!/bin/bash

# Deployment Configuration Verification Script
# This script verifies that all deployment files are properly configured

echo "🔍 Expense Tracker Deployment Verification"
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASS=0
FAIL=0
WARN=0

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 exists"
        ((PASS++))
        return 0
    else
        echo -e "${RED}✗${NC} $1 is missing"
        ((FAIL++))
        return 1
    fi
}

# Function to check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 directory exists"
        ((PASS++))
        return 0
    else
        echo -e "${RED}✗${NC} $1 directory is missing"
        ((FAIL++))
        return 1
    fi
}

# Function to check file content
check_content() {
    if grep -q "$2" "$1" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $1 contains expected content"
        ((PASS++))
        return 0
    else
        echo -e "${RED}✗${NC} $1 missing expected content: $2"
        ((FAIL++))
        return 1
    fi
}

echo "📁 Checking Documentation Files..."
check_file "README.md"
check_file "QUICKSTART.md"
check_file ".gitignore"
echo ""

echo "🐳 Checking Docker Files..."
check_file "docker-compose.yml"
check_file "server/Dockerfile"
check_file "server/.dockerignore"
check_file "client side/Dockerfile"
check_file "client side/.dockerignore"
check_file "client side/nginx.conf"
echo ""

echo "🔧 Checking Environment Templates..."
check_file "server/.env.example"
check_file "client side/.env.example"
echo ""

echo "📚 Checking Deployment Guides..."
check_dir "deployment-guides"
check_file "deployment-guides/DOCKER.md"
check_file "deployment-guides/RENDER.md"
check_file "deployment-guides/VERCEL-RAILWAY.md"
echo ""

echo "💾 Checking Database Files..."
check_dir "database"
check_file "database/schema.sql"
check_file "database/README.md"
echo ""

echo "🔍 Checking Code Updates..."
check_content "server/config/db.js" "DATABASE_URL"
check_content "server/app.js" "cors"
check_content "server/app.js" "trust proxy"
echo ""

echo "📦 Validating docker-compose.yml..."
if command -v docker &> /dev/null; then
    if docker compose config --quiet 2>&1 | grep -q "ERROR"; then
        echo -e "${RED}✗${NC} docker-compose.yml has syntax errors"
        ((FAIL++))
    else
        echo -e "${GREEN}✓${NC} docker-compose.yml is valid"
        ((PASS++))
    fi
else
    echo -e "${YELLOW}⚠${NC} Docker not installed, skipping validation"
    ((WARN++))
fi
echo ""

echo "📋 Checking Essential Files..."
check_file "server/package.json"
check_file "client side/package.json"
check_file "server/app.js"
check_file "server/server.js"
check_file "server/config/db.js"
echo ""

echo "🔒 Checking .gitignore Protection..."
if [ -f ".gitignore" ]; then
    if grep -q "^\.env$" ".gitignore" 2>/dev/null || grep -q "^\.env\.local$" ".gitignore" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} .env files are gitignored"
        ((PASS++))
    else
        echo -e "${YELLOW}⚠${NC} .env files may not be fully protected"
        ((WARN++))
    fi
fi
echo ""

echo "=========================================="
echo "📊 Summary:"
echo -e "   ${GREEN}Passed: $PASS${NC}"
if [ $FAIL -gt 0 ]; then
    echo -e "   ${RED}Failed: $FAIL${NC}"
fi
if [ $WARN -gt 0 ]; then
    echo -e "   ${YELLOW}Warnings: $WARN${NC}"
fi
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✅ Deployment configuration is complete!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Review the QUICKSTART.md for deployment options"
    echo "2. Choose your deployment method (Docker, Render, Vercel, etc.)"
    echo "3. Follow the deployment guide in deployment-guides/"
    exit 0
else
    echo -e "${RED}❌ Some deployment files are missing or invalid${NC}"
    echo "Please review the errors above and ensure all files are in place."
    exit 1
fi
