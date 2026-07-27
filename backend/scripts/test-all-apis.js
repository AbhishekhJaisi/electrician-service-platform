const http = require("http");

function request(path, options = {}, bodyData = null) {
  return new Promise((resolve, reject) => {
    const reqOpts = {
      hostname: "localhost",
      port: 3000,
      path: "/api" + path,
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    };

    const req = http.request(reqOpts, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        let parsed = data;
        try { parsed = JSON.parse(data); } catch (e) {}
        resolve({ statusCode: res.statusCode, body: parsed });
      });
    });

    req.on("error", (err) => reject(err));

    if (bodyData) {
      req.write(JSON.stringify(bodyData));
    }
    req.end();
  });
}

async function runTests() {
  console.log("🧪 Running backend API end-to-end test suite...\n");
  let passed = 0;
  let failed = 0;

  async function assertTest(name, fn) {
    try {
      await fn();
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ [FAIL] ${name}:`, err.message);
      failed++;
    }
  }

  // 1. Health check
  await assertTest("Health Check (/api/health)", async () => {
    const res = await request("/health");
    if (res.statusCode !== 200 || res.body.status !== "ok") {
      throw new Error(`Unexpected status ${res.statusCode}: ${JSON.stringify(res.body)}`);
    }
  });

  // 2. Public Business Info
  await assertTest("Get Business Info (/api/business)", async () => {
    const res = await request("/business");
    if (res.statusCode !== 200 || !res.body.success) {
      throw new Error(`Failed to fetch business info: ${JSON.stringify(res.body)}`);
    }
  });

  // 3. Public Services
  await assertTest("Get Services (/api/services)", async () => {
    const res = await request("/services");
    if (res.statusCode !== 200 || !res.body.success || !Array.isArray(res.body.data)) {
      throw new Error(`Failed to fetch services: ${JSON.stringify(res.body)}`);
    }
  });

  // 4. Public Reviews
  await assertTest("Get Reviews (/api/reviews)", async () => {
    const res = await request("/reviews");
    if (res.statusCode !== 200 || !res.body.success) {
      throw new Error(`Failed to fetch reviews: ${JSON.stringify(res.body)}`);
    }
  });

  // 5. Public Areas
  await assertTest("Get Areas (/api/areas)", async () => {
    const res = await request("/areas");
    if (res.statusCode !== 200 || !res.body.success) {
      throw new Error(`Failed to fetch areas: ${JSON.stringify(res.body)}`);
    }
  });

  // 6. Submit Enquiry
  await assertTest("Submit Enquiry (/api/enquiries)", async () => {
    const res = await request("/enquiries", { method: "POST" }, {
      name: "API Test User",
      phone: "+91 9876543210",
      email: "test@example.com",
      service: "House Wiring",
      message: "Testing enquiry creation endpoint",
    });
    if (res.statusCode !== 201 || !res.body.success) {
      throw new Error(`Failed to create enquiry: ${JSON.stringify(res.body)}`);
    }
  });

  // 7. Submit Booking
  await assertTest("Submit Booking (/api/bookings)", async () => {
    const res = await request("/bookings", { method: "POST" }, {
      name: "Booking Test User",
      phone: "9876543210",
      address: "Margherita Sector 4",
      issueType: "wiring",
      notes: "Test booking creation",
    });
    if (res.statusCode !== 201 || !res.body.success) {
      throw new Error(`Failed to create booking: ${JSON.stringify(res.body)}`);
    }
  });

  // 8. Admin Login
  let adminToken = "";
  await assertTest("Admin Login (/api/auth/login)", async () => {
    const res = await request("/auth/login", { method: "POST" }, {
      username: "admin",
      password: "admin123",
    });
    if (res.statusCode !== 200 || !res.body.success || !res.body.token) {
      throw new Error(`Admin login failed: ${JSON.stringify(res.body)}`);
    }
    adminToken = res.body.token;
  });

  // 9. Admin Protected — Get Bookings
  await assertTest("Admin Get Bookings (/api/admin/bookings)", async () => {
    const res = await request("/admin/bookings", {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (res.statusCode !== 200 || !Array.isArray(res.body)) {
      throw new Error(`Admin get bookings failed: ${JSON.stringify(res.body)}`);
    }
  });

  // 10. Admin Protected — Get Enquiries
  await assertTest("Admin Get Enquiries (/api/enquiries)", async () => {
    const res = await request("/enquiries", {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    if (res.statusCode !== 200 || !res.body.success) {
      throw new Error(`Admin get enquiries failed: ${JSON.stringify(res.body)}`);
    }
  });

  console.log(`\n=================================`);
  console.log(`RESULTS: ${passed} passed, ${failed} failed`);
  console.log(`=================================\n`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
